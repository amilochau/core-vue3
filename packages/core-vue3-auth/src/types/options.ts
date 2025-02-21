/** Authentication options. */
export interface CoreVue3AuthOptions {
  /** Cognito settings. */
  cognito: {
    /** Cognito user pool id. */
    userPoolIdBuilder: () => string,
    /** Application client id. */
    clientIdBuilder: () => string,
  },
  /** Whether the users migration is disabled. */
  usersMigrationDisabled?: boolean,
};
