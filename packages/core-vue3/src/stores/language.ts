import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLanguageStore = defineStore('language', () => {
  const language = ref<'en' | 'fr' | string>(navigator.language.slice(0, 2) === 'fr' ? 'fr' : 'en'); // @todo make that configurable

  /**
   * Set language.
   * @param lang New lang to use.
   */
  const setLanguage = (lang: string) => {
    language.value = lang;
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
