#!/bin/bash

HOOK_DIR=$(git rev-parse --git-dir)/hooks
PRE_COMMIT=${HOOK_DIR}/pre-commit

# Create the hooks directory if it doesn't exist
mkdir -p "${HOOK_DIR}"

# Create the pre-commit hook
cat > "${PRE_COMMIT}" << 'EOL'
#!/bin/bash

echo "Running pre-commit hooks..."

# Run linters on staged files
echo "Running ESLint..."
npm run lint:js || { echo "ESLint failed!"; exit 1; }

echo "Running Stylelint..."
npm run lint:css || { echo "Stylelint failed!"; exit 1; }

echo "Running HTMLHint..."
npm run lint:html || { echo "HTMLHint failed!"; exit 1; }

echo "Running markdownlint..."
npm run lint:md || { echo "markdownlint failed!"; exit 1; }

echo "All pre-commit hooks passed!"
EOL

# Make the hook executable
chmod +x "${PRE_COMMIT}"

echo "Git hooks installed successfully!"
