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
          sourceLang: 'fr',
          targetLangs: ['en'],
          translations: {},
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
          if (!this.text.trim() || this.targetLangs.length === 0) return;
          this.loading = true;
          this.translations = {};
          try {
            const promises = this.targetLangs.map(async lang => {
              const params = new URLSearchParams();
              if (config.API_KEY) params.append('auth_key', config.API_KEY);
              params.append('text', this.text);
              if (this.sourceLang) params.append('source_lang', this.sourceLang.toUpperCase());
              params.append('target_lang', lang.toUpperCase());

              const response = await fetch(`${config.API_URL}/translate`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
              });
              const data = await response.json();
              return { lang, text: data.translations?.[0]?.text || '' };
            });

            const results = await Promise.all(promises);
            results.forEach(r => {
              this.translations[r.lang] = r.text;
            });
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
