#!/usr/bin/env bash
# Vercel caps vercel.json's buildCommand at 256 characters. Exceeding it fails
# schema validation instantly, before any build runs, so the deploy dies with a
# config error rather than a build error. The full chain is longer than that,
# so it lives here and vercel.json just calls this file.
#
# inject-seo.cjs and generate-sitemap.cjs resolve dist/ from process.cwd(), so
# every step has to run from the repo root.
set -euo pipefail

cd "$(dirname "$0")/.."

npm install --prefix apps/web
npm run build --prefix apps/web
node apps/web/tools/generate-page-dates.cjs
node apps/web/tools/inject-seo.cjs
node apps/web/tools/generate-sitemap.cjs
node apps/web/tools/create-static-pages.cjs
node apps/web/tools/verify-routes.cjs
