import { defineStore } from 'pinia';

interface ThemeStoreState {
  darkMode: boolean,
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeStoreState => ({
    darkMode: false,
  }),
  persist: {
    storage: 'localStorage',
  },
});
