const { createApp } = Vue;

// Load config safely
import('./config.js')
  .catch(() => import('./config.sample.js'))
  .then(module => {
    const config = module.default;

    createApp({
      data() {
        return {
          text: '',
          sourceLang: 'en',
          targetLang: 'es',
          translated: '',
          loading: false,
          languages: {
            en: 'English',
            es: 'Spanish',
            fr: 'French',
            de: 'German',
            it: 'Italian',
            ja: 'Japanese',
            zh: 'Chinese',
          },
        };
      },
      methods: {
        async translate() {
          if (!this.text.trim()) return;
          this.loading = true;
          this.translated = '';
          try {
            const response = await fetch(`${config.API_URL}/translate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(config.API_KEY ? { 'Authorization': `Bearer ${config.API_KEY}` } : {}),
              },
              body: JSON.stringify({
                q: this.text,
                source: this.sourceLang,
                target: this.targetLang,
                format: 'text',
              }),
            });
            const data = await response.json();
            this.translated = data.translatedText || data.data?.translations?.[0]?.translatedText || '';
          } catch (err) {
            console.error(err);
            alert('Translation failed.');
          } finally {
            this.loading = false;
          }
        },
      },
    }).mount('#app');
  });
