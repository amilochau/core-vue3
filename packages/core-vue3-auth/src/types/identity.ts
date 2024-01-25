export type ForgotPassword = {
  email: string
};

export type ResetPassword = {
  email: string
  password: string
  confirmationPassword: string
  code: string
};

export type SetPassword = {
  email: string
  password: string
  confirmationPassword: string
};

export type ConfirmEmail = {
  email: string
  code: string
};

export type Register = {
  name: string
  email: string
  password: string
  confirmationPassword: string
};

export type EditPassword = {
  oldPassword: string
  password: string
  confirmationPassword: string
};

export type EditProfile = {
  name: string
};

export type Login = {
  email: string
  password: string
};
