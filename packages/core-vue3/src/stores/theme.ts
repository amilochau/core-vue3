import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const darkMode = ref(false);

  return {
    darkMode,
  };
}, {
  persist: {
    storage: 'localStorage',
  },
});
