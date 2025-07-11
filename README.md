# Multi Translate

A simple client-side translation app built with Vue 3 and Tailwind CSS. It relies on the [LibreTranslate](https://libretranslate.com) API by default, but you can point it to any translation service that accepts the same request format.

## Setup

1. Copy `config.sample.js` to `config.js` and adjust the API endpoint or API key if required:
   ```bash
   cp config.sample.js config.js
   # edit config.js
   ```
2. Open `index.html` in your browser.

The app does not require a build step or backend server; everything runs directly in the browser.

## Security Notes

`config.js` is ignored by git so that your API key stays out of version control. Keep the file private if you include sensitive credentials.

