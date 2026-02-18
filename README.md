# The Gift Finder

AI-powered gift recommendations for the Indian market. Describe a recipient's personality, hobbies, age, and budget — get six personalised gift ideas with direct buy links to Indian retailers.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure API key**
   ```bash
   cp .env.example .env
   # Edit .env and add your Anthropic API key
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173)

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Tech Stack

- **React 18** + **Vite 5**
- **Claude API** (claude-sonnet-4-20250514)
- Client-side only — no backend, no auth, no data storage

## API Key

Get your Anthropic API key at [console.anthropic.com](https://console.anthropic.com/).

**Production note:** Exposing API keys in client-side code is not recommended. Consider a lightweight backend proxy for production deployments.
