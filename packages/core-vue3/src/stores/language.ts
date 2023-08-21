import { defineStore } from 'pinia'

interface LanguageStoreState {
  language: 'en' | 'fr' | string,
}

export const useLanguageStore = defineStore('language', {
  state: (): LanguageStoreState => ({
    language: navigator.language.slice(0, 2) === 'fr' ? 'fr' : 'en' // @todo make that configurable
  }),
  actions: {
    setLanguage(lang: string) {
      this.language = lang
    }
  },
  persist: {
    storage: 'localStorage'
  }
})
