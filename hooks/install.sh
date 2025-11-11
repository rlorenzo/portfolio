#!/bin/bash

# Installation script for git hooks
# Run this script to install pre-commit hooks

HOOK_DIR=".git/hooks"
SOURCE_DIR="hooks"

echo "Installing git hooks..."

# Check if .git directory exists
if [ ! -d ".git" ]; then
  echo "Error: Not a git repository. Run this script from the project root."
  exit 1
fi

# Create hooks directory if it doesn't exist
mkdir -p "$HOOK_DIR"

# Install pre-commit hook
if [ -f "$SOURCE_DIR/pre-commit" ]; then
  cp "$SOURCE_DIR/pre-commit" "$HOOK_DIR/pre-commit"
  chmod +x "$HOOK_DIR/pre-commit"
  echo "✓ Installed pre-commit hook"
else
  echo "Error: $SOURCE_DIR/pre-commit not found"
  exit 1
fi

echo "✅ Git hooks installed successfully!"
echo ""
echo "The pre-commit hook will now run linters automatically before each commit."
echo "To bypass the hook (not recommended), use: git commit --no-verify"
