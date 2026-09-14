#!/bin/sh
# Pull alaidi.net from GitHub and sync it into the web root.
# Safe to run from cron every few minutes: it exits quickly when nothing changed.
#
#   ./deploy.sh            pull, then sync if the pull brought something new
#   ./deploy.sh --force    sync even when git reports no change
#
# Set DOCROOT below, or pass it in the environment:
#   DOCROOT=/home/u123/public_html ./deploy.sh

set -eu

REPO="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
DOCROOT="${DOCROOT:-$HOME/public_html}"
BRANCH="${BRANCH:-main}"

# Files that live on the server but must never be pushed or pulled:
#  - .git/.gitignore/deploy.sh are repo plumbing, not website content
#  - the 116 MB Computer Vision lecture is over GitHub's 100 MB limit, so it is
#    uploaded by hand and git has never seen it. Excluding it here is what stops
#    --delete from wiping it on every deploy.
KEEP="download/files/introduction-to-computer-vision-Lecture_01_Introduction.pptx"

log() { echo "$(date '+%Y-%m-%d %H:%M:%S')  $*"; }

# One deploy at a time. mkdir is atomic on every filesystem a shared host uses;
# flock is not always installed.
LOCK="$REPO/.deploy.lock"
if ! mkdir "$LOCK" 2>/dev/null; then
    log "another deploy is running ($LOCK exists) - skipping"
    exit 0
fi
trap 'rmdir "$LOCK" 2>/dev/null || true' EXIT INT TERM

[ -d "$DOCROOT" ] || { log "ERROR: DOCROOT does not exist: $DOCROOT"; exit 1; }

cd "$REPO"
before=$(git rev-parse HEAD)
git fetch --quiet origin "$BRANCH"
git reset --quiet --hard "origin/$BRANCH"      # server is a mirror, never a place to edit
after=$(git rev-parse HEAD)

if [ "$before" = "$after" ] && [ "${1:-}" != "--force" ]; then
    log "already up to date at ${after%"${after#???????}"} - nothing to do"
    exit 0
fi

log "deploying ${before%"${before#???????}"} -> ${after%"${after#???????}"}"

# --delete removes files dropped from the repo, so the site never accumulates
# orphans - this is also what clears WordPress out once you stop serving it.
# Every --exclude below is protected from that deletion, which is the point:
# a shared web root holds things this repo has no business owning.
#   .well-known  Let's Encrypt writes its ACME challenge here. Delete it and
#                certificate renewal fails, and HTTPS dies ~90 days later.
#   cgi-bin      created by the host, not by us
#   error_log    the host's, and useful when something breaks
rsync -a --delete \
      --exclude '.git/' \
      --exclude '.gitignore' \
      --exclude '.github/' \
      --exclude 'deploy.sh' \
      --exclude '.deploy.lock' \
      --exclude '.well-known/' \
      --exclude 'cgi-bin/' \
      --exclude 'error_log' \
      --exclude "$KEEP" \
      "$REPO"/ "$DOCROOT"/

if [ -f "$DOCROOT/$KEEP" ]; then
    log "ok: hand-uploaded lecture still in place"
else
    log "WARNING: $KEEP is missing from the web root."
    log "         /fall-2024/computer-vision/ has one dead download until you upload it."
fi

log "deployed to $DOCROOT"
