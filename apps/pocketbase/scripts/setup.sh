#!/bin/bash
set -euo pipefail

# Credentials come from the environment. Never hardcode them here — this file is
# tracked in git, and anything written into it stays in history forever.
: "${PB_SUPERUSER_EMAIL:?PB_SUPERUSER_EMAIL is not set}"
: "${PB_SUPERUSER_PASSWORD:?PB_SUPERUSER_PASSWORD is not set}"

PB_PORT="${PORT:-8090}"
PB_VERSION="0.38.0"

# Download PocketBase
curl -fsSL "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip" -o /tmp/pb.zip
unzip -o -q /tmp/pb.zip pocketbase
chmod +x pocketbase
rm -f /tmp/pb.zip

# Create/update the superuser from the environment
./pocketbase superuser upsert "$PB_SUPERUSER_EMAIL" "$PB_SUPERUSER_PASSWORD"

# Serve in the background so collections can be provisioned against it, then
# hand the foreground back to that same process (no kill/restart dance).
./pocketbase serve --http=0.0.0.0:"$PB_PORT" --dir=./pb_data &
PB_PID=$!

for _ in $(seq 1 30); do
  if curl -fsS "http://127.0.0.1:${PB_PORT}/api/health" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

TOKEN=$(curl -s -X POST "http://127.0.0.1:${PB_PORT}/api/collections/_superusers/auth-with-password" \
  -H 'Content-Type: application/json' \
  --data-binary "$(PB_E="$PB_SUPERUSER_EMAIL" PB_P="$PB_SUPERUSER_PASSWORD" python3 -c \
    'import json,os; print(json.dumps({"identity":os.environ["PB_E"],"password":os.environ["PB_P"]}))')" \
  | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null || true)

# Collections the application code reads and writes. Creating one that already
# exists is a no-op error, so this is safe to run on every boot.
create_collection() {
  curl -s -X POST "http://127.0.0.1:${PB_PORT}/api/collections" \
    -H "Authorization: $TOKEN" \
    -H 'Content-Type: application/json' \
    -d "$1" > /dev/null 2>&1 || true
}

if [ -n "$TOKEN" ]; then
  create_collection '{"name":"quote_requests","type":"base","fields":[{"name":"name","type":"text"},{"name":"email","type":"email"},{"name":"phone","type":"text"},{"name":"serviceZipCode","type":"text"},{"name":"serviceType","type":"text"},{"name":"numberOfDogs","type":"number"},{"name":"additionalNotes","type":"text"}],"createRule":"","listRule":"","viewRule":""}'
  create_collection '{"name":"leads","type":"base","fields":[{"name":"name","type":"text"},{"name":"email","type":"email"},{"name":"phone","type":"text"},{"name":"address","type":"text"}],"createRule":"","listRule":"","viewRule":""}'
  create_collection '{"name":"chat_summaries","type":"base","fields":[{"name":"userId","type":"text"},{"name":"userEmail","type":"email"},{"name":"userName","type":"text"},{"name":"messageCount","type":"number"},{"name":"sentAt","type":"text"}],"createRule":"","listRule":"","viewRule":""}'
  create_collection '{"name":"integrated_ai_messages","type":"base","fields":[{"name":"userId","type":"text"},{"name":"role","type":"text"},{"name":"content","type":"text"}],"createRule":"","listRule":"","viewRule":""}'
  create_collection '{"name":"integrated_ai_images","type":"base","fields":[{"name":"userId","type":"text"}],"createRule":"","listRule":"","viewRule":""}'
  create_collection '{"name":"google_reviews_cache","type":"base","fields":[{"name":"data","type":"text"},{"name":"cachedAt","type":"text"}],"createRule":"","listRule":"","viewRule":""}'
  create_collection '{"name":"checklist_signups","type":"base","fields":[{"name":"email","type":"email"},{"name":"name","type":"text"}],"createRule":"","listRule":"","viewRule":""}'
else
  echo "WARN: could not authenticate as superuser; skipping collection provisioning" >&2
fi

wait "$PB_PID"
