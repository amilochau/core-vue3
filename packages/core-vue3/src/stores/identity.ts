import { defineStore } from 'pinia';

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
    setAttributes(attributes: { sub: string, name: string, email: string, user_id: string }) {
      this.attributes = attributes;
    },

    clean() {
      this.$patch(getDefaultState());
    },
  },
  persist: {
    storage: 'localStorage',
  },
});
