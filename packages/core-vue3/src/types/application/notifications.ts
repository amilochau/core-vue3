/** Notification register type. */
export enum NotificationRegisterType {
  Subscribe = 0,
  Unsusbscribe = 1,
}

/** Request data to register push notifications. */
export type NotificationsRegisterRequest = {
  endpoint: string
  expirationTime: number | null
  p256Dh: string
  auth: string
  registerType: NotificationRegisterType
  culture?: string
};
