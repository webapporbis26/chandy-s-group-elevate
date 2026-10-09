#!/bin/bash
# Publish the built static site to the `plesk-deploy` branch.
# Plesk Git must be set to pull the `plesk-deploy` branch into httpdocs
# (the `main` branch contains source files only and will NOT run on the server).
set -e
cd "$(dirname "$0")"

echo "Building..."
npm run build

TMPDIR=$(mktemp -d)
cp -r dist/. "$TMPDIR/"
cd "$TMPDIR"
git init -b plesk-deploy -q
git add -A
git -c user.email="akshayck008@gmail.com" -c user.name="akshay ck" \
  commit -qm "deploy: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git remote add origin https://github.com/webapporbis26/chandy-s-group-elevate
git push -f origin plesk-deploy
cd /
rm -rf "$TMPDIR"
echo "Published to plesk-deploy branch."
