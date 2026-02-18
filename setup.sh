#!/bin/bash
set -e

echo "→ Loading nvm..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "→ Checking Node.js..."
if ! command -v node &> /dev/null; then
  echo "   Installing Node.js LTS (this may take 2–3 minutes)..."
  nvm install --lts
  nvm use --lts
fi

echo "→ Node $(node -v) | npm $(npm -v)"
echo "→ Installing project dependencies..."
cd "$(dirname "$0")"
npm install

echo ""
echo "✓ Setup complete! Run: npm run dev"
echo "  Don't forget to add your Anthropic API key to .env (see .env.example)"
