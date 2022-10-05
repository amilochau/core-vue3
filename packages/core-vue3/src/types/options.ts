export type MilochauCoreOptions = {
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
    }
  }
}
