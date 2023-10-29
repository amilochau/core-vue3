import { useAppStore, useIdentityStore, useNotificationsStore } from "../stores"
import { NotificationRegisterType, type NotificationsRegisterRequest } from "../types/application/notifications";
import { computed } from "vue";
import { useCoreOptions } from "./options";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const urlB64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const useNotifications = () => {

  const { t, mergeLocaleMessage } = useI18n()
  const coreOptions = useCoreOptions()
  const identityStore = useIdentityStore()
  const { isAuthenticated } = storeToRefs(identityStore)
  const appStore = useAppStore()
  const notificationsStore = useNotificationsStore()
  const { registred } = storeToRefs(notificationsStore)
  const register = coreOptions.notifications?.register()

  mergeLocaleMessage('en', {
    permissionsNotGranted: 'You must allow notifications on your device to display them.'
  })
  mergeLocaleMessage('fr', {
    permissionsNotGranted: 'Vous devez autoriser les notifications sur votre appareil pour pouvoir les afficher.'
  })

  const isSupported = computed(() => registred.value || navigator.serviceWorker && 'PushManager' in window
      && !!coreOptions.notifications
      && isAuthenticated.value)

  const subscribe = async () => {
    try {
      if (!isSupported.value ||  registred.value) {
        // Not supported, or already registred
        return;
      }

      const registration = await navigator.serviceWorker.ready
      if (!registration) {
        // Service worker registration not found
        return;
      }

      const permissionResult = await Notification.requestPermission();
      if (permissionResult !== 'granted') {
        // Permission not granted
        appStore.displayErrorMessage(t('permissionsNotGranted'), undefined, 'snackbar')
        return;
      }

      appStore.loading = true // Don't load before permissions, as permissions on Edge never resolve when blocked

      const currentSubscription = await registration.pushManager.getSubscription()
      if (currentSubscription) {
        // Alreay registred
        notificationsStore.registred = true;
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(coreOptions.notifications!.pushKey),
      })

      const subscriptionJson = subscription.toJSON();
      const request: NotificationsRegisterRequest = {
        endpoint: subscriptionJson.endpoint!,
        expirationTime: subscriptionJson.expirationTime!,
        auth: subscriptionJson.keys!.auth,
        p256Dh: subscriptionJson.keys!.p256dh,
        registerType: NotificationRegisterType.Subscribe,
      }

      await register!(request)

      notificationsStore.registred = true;
    } catch (error) {
      console.error('Error when subscribing to push notifications', error)

      try {
        // Try to unregister
      notificationsStore.registred = false;
      const registration = await navigator.serviceWorker.ready
      if (!registration) {
        return;
      }
      const subscription = await registration.pushManager.getSubscription()
      if (!subscription) {
        return;
      }

      await subscription.unsubscribe()
      } catch (error2) {
        console.error('Error when unsubscribing to push notifications', error)
      }
    } finally {
      appStore.loading = false
    }
  }

  const unsubscribe = async () => {
    try {
      appStore.loading = true

      if (!isSupported.value ||  !notificationsStore.registred) {
        notificationsStore.registred = false;
        return;
      }

      const registration = await navigator.serviceWorker.ready
      if (!registration) {
        return;
      }

      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        notificationsStore.registred = false;
        return;
      }

      await subscription.unsubscribe()

      const subscriptionJson = subscription.toJSON();
      const request: NotificationsRegisterRequest = {
        endpoint: subscriptionJson.endpoint!,
        expirationTime: subscriptionJson.expirationTime!,
        auth: subscriptionJson.keys!.auth,
        p256Dh: subscriptionJson.keys!.p256dh,
        registerType: NotificationRegisterType.Unsusbscribe,
      }

      await register!(request)

      notificationsStore.registred = false;
    } catch (error) {
      console.error('Error when unsubscribing to push notifications', error)
    } finally {
      appStore.loading = false
    }
  }

  return {
    isSupported,
    isRegistred: registred,
    subscribe,
    unsubscribe,
  }
}
