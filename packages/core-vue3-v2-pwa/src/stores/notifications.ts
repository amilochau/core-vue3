import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationsStore = defineStore('notifications', () => {
  /** Store state. */
  const registred = ref(false);
  return {
    registred,
  };
}, {
  persist: {
    storage: 'localStorage',
  },
});
