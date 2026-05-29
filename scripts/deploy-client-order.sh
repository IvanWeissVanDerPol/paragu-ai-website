#!/bin/bash
# deploy-client-order.sh
# Saves the current /public/client-order.json to GitHub, triggers Cloudflare Pages rebuild.
# Usage: ./scripts/deploy-client-order.sh
set -euo pipefail

GITHUB_TOKEN="${GITHUB_TOKEN:-}"
REPO="IvanWeissVanDerPol/paragu-ai-website"
BRANCH="main"
JSON_FILE="public/client-order.json"

if [ -z "$GITHUB_TOKEN" ]; then
  echo "ERROR: GITHUB_TOKEN env var not set. Get one at https://github.com/settings/tokens"
  echo "Needed scope: repo (full)"
  exit 1
fi

# Read current JSON content
CONTENT=$(cat "$JSON_FILE")
COMMIT_MSG="chore: update client order from admin panel"

# Get current tree SHA for the branch
TREE_SHA=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$REPO/git/ref/heads/$BRANCH" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['object']['sha'])")

# Create blob for the JSON file
BLOB_SHA=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"content\": $(echo "$CONTENT" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))"), \"encoding\": \"utf-8\"}" \
  "https://api.github.com/repos/$REPO/git/blobs" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")

# Create new tree
NEW_TREE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"base_tree\": \"$TREE_SHA\", \"tree\": [{\"path\": \"$JSON_FILE\", \"mode\": \"100644\", \"type\": \"blob\", \"sha\": \"$BLOB_SHA\"}]}" \
  "https://api.github.com/repos/$REPO/git/trees")

NEW_TREE_SHA=$(echo "$NEW_TREE" | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")

# Create commit
COMMIT=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"$COMMIT_MSG\", \"tree\": \"$NEW_TREE_SHA\", \"parents\": [\"$TREE_SHA\"]}" \
  "https://api.github.com/repos/$REPO/git/commits")

NEW_COMMIT_SHA=$(echo "$COMMIT" | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")

# Update branch ref
curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"ref\": \"refs/heads/$BRANCH\", \"sha\": \"$NEW_COMMIT_SHA\"}" \
  -X PATCH "https://api.github.com/repos/$REPO/git/refs/heads/$BRANCH"

echo "✓ Committed client-order.json to GitHub"
echo "✓ Cloudflare Pages will rebuild automatically (~30s)"
echo "Done. Site will reflect new order shortly."