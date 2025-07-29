# Multi Translate

A simple client-side translation app built with Vue 3 and Tailwind CSS. It now
uses the [DeepL](https://www.deepl.com/) API for translations.

## Setup

1. Copy `config.sample.js` to `config.js`, add your DeepL authentication key,
   and adjust `API_URL` if you're using the paid API endpoint:
   ```bash
   cp config.sample.js config.js
   # edit config.js
   ```
2. Open `index.html` in your browser.

The app does not require a build step or backend server; everything runs directly in the browser.

## Security Notes

`config.js` is ignored by git so that your API key stays out of version control. Keep the file private if you include sensitive credentials.

