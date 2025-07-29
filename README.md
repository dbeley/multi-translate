# Multi Translate

A simple client-side translation app built with Vue 3 and Tailwind CSS. It now
uses the [DeepL](https://www.deepl.com/) API for translations. Direct calls to
DeepL from the browser are blocked by CORS, so a small Node.js proxy server is
included. The source language is set to **Auto‑Detect** by default so you can
paste any text without choosing a language first.

## Setup

1. Copy `config.sample.js` to `config.js` and add your DeepL authentication key
   (optional, the server can also use an `API_KEY` environment variable):

   ```bash
   cp config.sample.js config.js
   # edit config.js
   ```
   `API_URL` already points to the local proxy server (`http://localhost:3000`).

2. Create a `.env` file (or export variables in your shell) to provide your
   DeepL API configuration:

   ```bash
   echo "API_KEY=your_key" > .env
   echo "API_URL=https://api-free.deepl.com/v2" >> .env
   ```

3. Install dependencies and start the server:
   ```bash
   npm install
   node server.js
   ```
   The server listens on port `3000` by default and forwards requests to DeepL.

4. Open `index.html` in your browser.

## Security Notes

`config.js` is ignored by git so that your API key stays out of version control. Keep the file private if you include sensitive credentials.

