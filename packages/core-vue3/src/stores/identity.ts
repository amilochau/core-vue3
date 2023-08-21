import { defineStore } from 'pinia'

const getDefaultState = (): IdentityStoreState => {
  return {
    isAuthenticated: false,
    attributes: {
      id: '',
      name: '',
      email: '',
    },
    onLogout: async () => {},
  }
}

interface IdentityStoreState {
  isAuthenticated: boolean,
  attributes: {
    id: string,
    name: string,
    email: string,
  },
  onLogout: () => Promise<any>,
}

export const useIdentityStore = defineStore('identity', {
  state: getDefaultState,
  actions: {
    setAttributes(attributes: {id: string, name: string, email: string}) {
      this.attributes = attributes
    },

    clean() {
      this.$patch(getDefaultState())
    },

    logout() {
      return this.onLogout();
    },
  },
  persist: {
    storage: 'localStorage'
  }
})
