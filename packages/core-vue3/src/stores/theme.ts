import { defineStore } from 'pinia';

/** Theme store state. */
interface ThemeStoreState {
  darkMode: boolean,
}

export const useThemeStore = defineStore('theme', {
  /** Store state. */
  state: (): ThemeStoreState => ({
    darkMode: false,
  }),
  persist: {
    storage: 'localStorage',
  },
});
