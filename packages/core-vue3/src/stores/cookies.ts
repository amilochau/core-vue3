import { defineStore } from 'pinia';

interface CookiesStoreState {
  accepted: boolean,
  expiration: number,
}

export const useCookiesStore = defineStore('cookies', {
  state: (): CookiesStoreState => ({
    accepted: false,
    expiration: 0,
  }),
  getters: {
    showCookies: (state) => {
      return state.expiration <= new Date().valueOf();
    },
  },
  actions: {
    acceptCookies() {
      this.accepted = true;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 360); // 360 days
      this.expiration = expirationDate.valueOf();
    },
    refuseCookies() {
      this.accepted = false;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 180); // 180 days
      this.expiration = expirationDate.valueOf();
    },
  },
  persist: {
    storage: 'localStorage',
  },
});
