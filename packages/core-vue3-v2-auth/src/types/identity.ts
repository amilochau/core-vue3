/** Forgot password model. */
export type ForgotPassword = {
  email: string
};

/** Reset password model. */
export type ResetPassword = {
  email: string
  password: string
  confirmationPassword: string
  code: string
};

/** Set password model. */
export type SetPassword = {
  email: string
  password: string
  confirmationPassword: string
};

/** Confirm email model. */
export type ConfirmEmail = {
  email: string
  code: string
};

/** Register model. */
export type Register = {
  name: string
  email: string
  password: string
  confirmationPassword: string
};

/** Edit password model. */
export type EditPassword = {
  oldPassword: string
  password: string
  confirmationPassword: string
};

/** Edit profile model. */
export type EditProfile = {
  name: string
};

/** Login model. */
export type Login = {
  email: string
  password: string
};
