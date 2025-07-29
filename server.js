const express = require('express');
const cors = require('cors');

const API_URL = process.env.API_URL || 'https://api-free.deepl.com/v2';
const API_KEY = process.env.API_KEY || '';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, source_lang, target_lang } = req.body;
  const params = new URLSearchParams();
  if (API_KEY) params.append('auth_key', API_KEY);
  if (text) params.append('text', text);
  if (source_lang) params.append('source_lang', source_lang.toUpperCase());
  if (target_lang) params.append('target_lang', target_lang.toUpperCase());

  try {
    const response = await fetch(`${API_URL}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
