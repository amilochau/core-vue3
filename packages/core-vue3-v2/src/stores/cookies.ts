import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCookiesStore = defineStore('cookies', () => {
  const accepted = ref(false);
  const expiration = ref(0);

  /** Whether to show cookies. */
  const showCookies = computed(() => expiration.value <= new Date().valueOf());

  /** Accept cookies. */
  const acceptCookies = () => {
    accepted.value = true;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 360); // 360 days
    expiration.value = expirationDate.valueOf();
  };

  /** Refuse cookies. */
  const refuseCookies = () => {
    accepted.value = false;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 180); // 180 days
    expiration.value = expirationDate.valueOf();
  };

  return {
    accepted,
    expiration,

    showCookies,
    acceptCookies,
    refuseCookies,
  };
}, {
  persist: {
    storage: 'localStorage',
  },
});
