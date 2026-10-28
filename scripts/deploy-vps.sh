#!/usr/bin/env bash
# Выкладывает сайт на VPS, где его отдаёт Caddy (itssteps.site → /var/www/itssteps).
# dist/index.html здесь не годится: это редирект для github.io, поэтому index.html
# на сервере берём из dist/app.html.
set -euo pipefail

HOST="root@212.69.85.99"
KEY="$HOME/.ssh/gptrade_vps"
REMOTE_DIR="/var/www/itssteps"

cd "$(dirname "$0")/.."
npm run build

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
cp -R dist/. "$STAGE"/
cp dist/app.html "$STAGE/index.html"

# COPYFILE_DISABLE — без служебных xattr-заголовков macOS в архиве
COPYFILE_DISABLE=1 tar -C "$STAGE" -cf - . \
  | ssh -i "$KEY" -o IdentitiesOnly=yes "$HOST" "mkdir -p $REMOTE_DIR && tar -C $REMOTE_DIR -xf -"

echo "Загружено: $HOST:$REMOTE_DIR"
