import { defineStore } from 'pinia';

/** Cookies store state. */
interface CookiesStoreState {
  accepted: boolean,
  expiration: number,
}

export const useCookiesStore = defineStore('cookies', {
  /** Store state. */
  state: (): CookiesStoreState => ({
    accepted: false,
    expiration: 0,
  }),
  getters: {
    /**
     * Whether to show cookies.
     * @param state State.
     */
    showCookies: (state) => {
      return state.expiration <= new Date().valueOf();
    },
  },
  actions: {
    /** Accept cookies. */
    acceptCookies() {
      this.accepted = true;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 360); // 360 days
      this.expiration = expirationDate.valueOf();
    },
    /** Refuse cookies. */
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
