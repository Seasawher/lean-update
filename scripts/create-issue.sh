#!/bin/bash

# Generate a list of changed files
BULLET_LIST=""
for file in $CHANGED_FILES; do
  BULLET_LIST="$BULLET_LIST
- $file"
done

# Get directory contents
DIR_CONTENTS=$(ls -la)
echo "Directory contents: $DIR_CONTENTS"

# Run lake build and capture its output
# Using || true to ensure the script continues even if lake build fails
BUILD_OUTPUT=$(lake build --log-level=warning 2>&1 || true)

# Create the body of the issue with safe truncation for GitHub limits
# GitHub issue body limit is 65536 characters. Keep a small safety margin.
MAX_BODY=65500

# Build body parts so we can truncate primarily within the build output section
PREFIX="$DESCRIPTION

Files changed in update:$BULLET_LIST

## Build Output

\`\`\`"
SUFFIX="\n\`\`\`"
TRUNCATION_NOTICE="\n...\n[truncated to fit GitHub issue body limit]\n"

prefix_len=${#PREFIX}
suffix_len=${#SUFFIX}
notice_len=${#TRUNCATION_NOTICE}
remaining=$((MAX_BODY - prefix_len - suffix_len))

if [ $remaining -le 0 ]; then
  # Prefix alone is too large; omit code block and hard-truncate the overall body
  BASE="$DESCRIPTION

Files changed in update:$BULLET_LIST

(omitted build output due to size)"
  if [ ${#BASE} -gt $MAX_BODY ]; then
    BODY="${BASE:0:$((MAX_BODY-3))}..."
  else
    BODY="$BASE"
  fi
else
  # Prefer truncating within the build output section
  if [ ${#BUILD_OUTPUT} -gt $remaining ]; then
    allow=$((remaining - notice_len))
    if [ $allow -lt 0 ]; then
      allow=0
    fi
    TRUNCATED_OUTPUT="${BUILD_OUTPUT:0:$allow}$TRUNCATION_NOTICE"
    BODY="$PREFIX\n$TRUNCATED_OUTPUT$SUFFIX"
  else
    BODY="$PREFIX\n$BUILD_OUTPUT$SUFFIX"
  fi
fi

# Check if the label exists, create it if not
if ! gh api repos/$GH_REPO/labels/$LABEL_NAME --silent 2>/dev/null; then
  echo "Creating $LABEL_NAME label..."
  gh api repos/$GH_REPO/labels -F name="$LABEL_NAME" -F color="$LABEL_COLOR" -F description="Auto update for Lean dependencies"
fi

# Check if an open issue with the same label already exists
if gh issue list --label "$LABEL_NAME" --state open --json number | grep -q "number"; then
  echo "An open issue with label '$LABEL_NAME' already exists. Skipping issue creation."
else
  # Create the issue
  gh issue create --title "$TITLE" --body "$BODY" --label "$LABEL_NAME"
fi
