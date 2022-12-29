export type ForgotPassword = {
  email: string
}

export type ResetPassword = {
  email: string
  password: string
  confirmationPassword: string
  code: string
}

export type ConfirmEmail = {
  email: string
  code: string
}

export type Register = {
  name: string
  email: string
  password: string
  confirmationPassword: string
}

export type EditPassword = {
  oldPassword: string
  password: string
  confirmationPassword: string
}

export type EditProfile = {
  name: string
}

export type Login = {
  email: string
  password: string
}

export type LoginError = {
  type: LoginErrorType
  message: string
  args: any
}

export enum LoginErrorType {
  Unknown = 0,
  MfaSetup = 1,
  CustomChallenge = 2,
  MfaRequired = 3,
  NewPasswordRequired = 4,
  SelectMFAType = 5,
  TotpRequired = 6
}
