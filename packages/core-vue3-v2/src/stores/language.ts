import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLanguageStore = defineStore('language', () => {
  const language = ref<string>(navigator.language.slice(0, 2) === 'fr' ? 'fr' : 'en'); // @todo make that configurable

  /**
   * Set language.
   * @param lang New lang to use.
   */
  const setLanguage = (lang: string) => {
    language.value = lang;
    const days = 7;
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `nf_lang=${lang}; path=/; expires=${expires}; SameSite=Lax`;
  };

  return {
    language,
    setLanguage,
  };
}, {
  persist: {
    storage: 'localStorage',
  },
});
