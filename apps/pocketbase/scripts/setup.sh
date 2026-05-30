#!/bin/bash
echo "Setting up PocketBase..."
if [ ! -f "pocketbase" ]; then
    OS=$(/usr/bin/uname -s | /usr/bin/tr [:UPPER:] [:lower:])
    ARCH=$(/usr/bin/uname -m)
    case $ARCH in
        x86_64) ARCH="amd64" ;;
        arm64|aarch64) ARCH="arm64" ;;
    esac
    VERSION=$(cat .pocketbase-version)
    URL="https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${OS}_${ARCH}.zip"
    echo "Downloading $URL"
    curl -L -o pocketbase.zip "$URL"
    /usr/bin/unzip pocketbase.zip
    /usr/bin/rm pocketbase.zip
    chmod +x pocketbase
fi
echo "PocketBase setup complete!"