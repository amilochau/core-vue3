import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { defineStore } from 'pinia'

function getDefaultState() {
  return {
    isAuthenticated: false,
    attributes: {
      id: '',
      name: '',
      email: '',
    }
  }
}

export const useStore = defineStore('identity', {
  state: getDefaultState,
  actions: {
    setAttributes(attributes?: CognitoUserAttribute[]) {
      this.attributes = {
        id: attributes?.find((x) => x.Name === 'sub')?.Value,
        name: attributes?.find((x) => x.Name === 'name')?.Value,
        email: attributes?.find((x) => x.Name === 'email')?.Value,
      }
    },

    clean() {
      this.$patch(getDefaultState())
    }
  },
  persist: {
    storage: localStorage
  }
})
