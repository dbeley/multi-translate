# Multi Translate

A simple client-side translation app built with Vue 3 and Tailwind CSS. It now
uses the [DeepL](https://www.deepl.com/) API for translations. Direct calls to
DeepL from the browser are blocked by CORS, so a small Node.js proxy server is
included. The source language is set to **Auto‑Detect** by default so you can
paste any text without choosing a language first.

## Setup

1. Create a `.env` file (or export variables in your shell) to provide your
   DeepL API configuration:

   ```bash
   echo "API_KEY=your_key" > .env
   echo "API_URL=https://api-free.deepl.com/v2" >> .env
   ```

2. Install dependencies and start the server:
   ```bash
   npm install
   node server.js
   ```
   The server listens on port `3000` by default and forwards requests to DeepL.

3. Open `index.html` in your browser.

## Security Notes

The `.env` file is ignored by git so that your API key stays out of version control. Keep the file private if you include sensitive credentials.

