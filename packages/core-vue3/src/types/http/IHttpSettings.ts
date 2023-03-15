export type IHttpSettings = {
  redirect404: boolean;
  authPolicy?: AuthPolicy;
}

export enum AuthPolicy {
  SendRequestsAsAnonymous = 0,
  SendRequestsAsAuthenticatedIfLoggedIn = 1,
  SendRequestsAsAuthenticated = 2
}
