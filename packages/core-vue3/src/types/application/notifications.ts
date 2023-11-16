export enum NotificationRegisterType {
  Subscribe = 0,
  Unsusbscribe = 1,
}

export type NotificationsRegisterRequest = {
  endpoint: string
  expirationTime: number | null
  p256Dh: string
  auth: string
  registerType: NotificationRegisterType
  culture?: string
};
