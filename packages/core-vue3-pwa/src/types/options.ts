import type { CoreOptions } from '@amilochau/core-vue3/types';
import type { NotificationsRegisterRequest } from './notifications';

/** Notifications options. */
export interface CorePwaNotificationsOptions {
  /** Push notifications public key. */
  pushKey: string;
  /** Register notifications. */
  register: () => (request: NotificationsRegisterRequest) => Promise<void>;
}

/** PWA options. */
export interface PwaOptions {
  /** Whether to hide the install button. */
  hideInstallBtn?: boolean;
}

/** Core PWA options - extends the CoreOptions with PWA specific properties */
export interface CorePwaOptions extends CoreOptions {
  /** Notifications options. */
  notifications?: CorePwaNotificationsOptions;
  /** PWA options. */
  pwa?: PwaOptions;
}
