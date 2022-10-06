export type MilochauCoreOptions = {
  application: {
    name: string,
    contact: string
  },
  messages: {}
  identity: {
    authorities: {
      register_login: string,
      profile_editing: string,
    },
    scopes: {
      use: string,
    },
    auth: {
      clientId: string,
      authority: string,
      knownAuthorities: string[],
      redirectUri: string,
      postLogoutRedirectUri: string,
    },
    loginRequest: {
      scopes: string[]
    }
  }
}
