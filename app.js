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
            const params = new URLSearchParams();
            if (config.API_KEY) params.append('auth_key', config.API_KEY);
            params.append('text', this.text);
            if (this.sourceLang) params.append('source_lang', this.sourceLang.toUpperCase());
            params.append('target_lang', this.targetLang.toUpperCase());

            const response = await fetch(`${config.API_URL}/translate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: params.toString(),
            });
            const data = await response.json();
            this.translated = data.translations?.[0]?.text || '';
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
