import { defineStore } from 'pinia';

/** Get default store state. */
const getDefaultState = (): IdentityStoreState => {
  return {
    isAuthenticated: false,
    attributes: {
      sub: '',
      name: '',
      email: '',
      user_id: '',
    },
  };
};

/** Identity store state. */
interface IdentityStoreState {
  isAuthenticated: boolean,
  attributes: {
    sub: string,
    name: string,
    email: string,
    user_id: string,
  },
}

export const useIdentityStore = defineStore('identity', {
  state: getDefaultState,
  actions: {
    /**
     * Set identity attributes.
     * @param attributes Identity attributes.
     * @param attributes.sub Attribute `sub`.
     * @param attributes.name Attribute `name`.
     * @param attributes.email Attribute `email`.
     * @param attributes.user_id Attribute `user_id`.
     */
    setAttributes(attributes: { sub: string, name: string, email: string, user_id: string }) {
      this.attributes = attributes;
    },

    /** Clean store. */
    clean() {
      this.$patch(getDefaultState());
    },
  },
  persist: {
    storage: 'localStorage',
  },
});
