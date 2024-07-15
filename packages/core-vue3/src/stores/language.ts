import { defineStore } from 'pinia';

/** Language store state. */
interface LanguageStoreState {
  language: 'en' | 'fr' | string,
}

export const useLanguageStore = defineStore('language', {
  /** Store state. */
  state: (): LanguageStoreState => ({
    language: navigator.language.slice(0, 2) === 'fr' ? 'fr' : 'en', // @todo make that configurable
  }),
  actions: {
    /**
     * Set language.
     * @param lang New lang to use.
     */
    setLanguage(lang: string) {
      this.language = lang;
    },
  },
  persist: {
    storage: 'localStorage',
  },
});
