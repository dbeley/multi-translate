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
          sourceLang: 'auto',
          targetLangs: ['en'],
          selectedLang: 'en',
          translations: {},
          loading: false,
          darkMode: false,
          toastVisible: false,
          sourceLanguages: {
            auto: 'Auto-Detect',
            bg: 'Bulgarian',
            cs: 'Czech',
            da: 'Danish',
            de: 'German',
            el: 'Greek',
            en: 'English',
            es: 'Spanish',
            et: 'Estonian',
            fi: 'Finnish',
            fr: 'French',
            hu: 'Hungarian',
            id: 'Indonesian',
            it: 'Italian',
            ja: 'Japanese',
            ko: 'Korean',
            lt: 'Lithuanian',
            lv: 'Latvian',
            nb: 'Norwegian Bokm\u00e5l',
            nl: 'Dutch',
            pl: 'Polish',
            pt: 'Portuguese',
            ro: 'Romanian',
            ru: 'Russian',
            sk: 'Slovak',
            sl: 'Slovenian',
            sv: 'Swedish',
            tr: 'Turkish',
            uk: 'Ukrainian',
            zh: 'Chinese (Simplified)',
          },
          languages: {
            bg: 'Bulgarian',
            cs: 'Czech',
            da: 'Danish',
            de: 'German',
            el: 'Greek',
            en: 'English',
            'en-GB': 'English (British)',
            'en-US': 'English (American)',
            es: 'Spanish',
            et: 'Estonian',
            fi: 'Finnish',
            fr: 'French',
            hu: 'Hungarian',
            id: 'Indonesian',
            it: 'Italian',
            ja: 'Japanese',
            ko: 'Korean',
            lt: 'Lithuanian',
            lv: 'Latvian',
            nb: 'Norwegian Bokm\u00e5l',
            nl: 'Dutch',
            pl: 'Polish',
            'pt-PT': 'Portuguese (European)',
            'pt-BR': 'Portuguese (Brazilian)',
            ro: 'Romanian',
            ru: 'Russian',
            sk: 'Slovak',
            sl: 'Slovenian',
            sv: 'Swedish',
            tr: 'Turkish',
            uk: 'Ukrainian',
            zh: 'Chinese (Simplified)',
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
              if (this.sourceLang && this.sourceLang !== 'auto') {
                params.append('source_lang', this.sourceLang.toUpperCase());
              }
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

        clearTargets() {
          this.targetLangs = [];
        },

        addTarget() {
          if (this.selectedLang && !this.targetLangs.includes(this.selectedLang)) {
            this.targetLangs.push(this.selectedLang);
          }
        },

        toggleDarkMode() {
          this.darkMode = !this.darkMode;
        },

        removeTarget(code) {
          this.targetLangs = this.targetLangs.filter(l => l !== code);
        },

        copyTranslation(text) {
          navigator.clipboard.writeText(text)
            .then(() => {
              this.toastVisible = true;
              setTimeout(() => {
                this.toastVisible = false;
              }, 1000);
            })
            .catch(err => console.error(err));
        },

        saveState() {
          const state = {
            text: this.text,
            sourceLang: this.sourceLang,
            targetLangs: this.targetLangs,
            selectedLang: this.selectedLang,
            darkMode: this.darkMode,
          };
          localStorage.setItem('multi-translate-state', JSON.stringify(state));
        },
      },

      created() {
        const saved = localStorage.getItem('multi-translate-state');
        if (saved) {
          try {
            const state = JSON.parse(saved);
            this.text = state.text || this.text;
            this.sourceLang = state.sourceLang || this.sourceLang;
            this.targetLangs = state.targetLangs || this.targetLangs;
            this.selectedLang = state.selectedLang || this.selectedLang;
            this.darkMode = state.darkMode ?? this.darkMode;
          } catch (_) {}
        }
      },

      watch: {
        text: 'saveState',
        sourceLang: 'saveState',
        selectedLang: 'saveState',
        darkMode: 'saveState',
        targetLangs: {
          handler: 'saveState',
          deep: true,
        },
      },
    }).mount('#app');
  });
