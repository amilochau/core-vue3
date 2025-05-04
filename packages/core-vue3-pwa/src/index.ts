import { useNotificationsStore, usePwaStore } from './stores';
import { registerSW } from 'virtual:pwa-register';
import { type RouteLocationNormalized } from 'vue-router';
import { mdiInformationOutline, mdiBellOutline } from '@mdi/js';
import { useSettingsStore } from '@amilochau/core-vue3/stores';
import { CoreVue3Context } from '@amilochau/core-vue3/types';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { CorePwaOptions } from './types';

/**
 * Register vue-pwa.
 * @param router Router instance.
 */
export const registerPwa = (context: CoreVue3Context, pwaOptions: CorePwaOptions) => {
  context.app.provide('core-options-pwa', pwaOptions);

  const pwaStore = usePwaStore(context.pinia);
  const settingsStore = useSettingsStore(context.pinia);
  const notificationsStore = useNotificationsStore(context.pinia);
  const { registred } = storeToRefs(notificationsStore);
  const isNotificationsSupported = computed(() => registred.value || navigator.serviceWorker && 'PushManager' in window
    && !!pwaOptions.notifications);
  const { mergeLocaleMessage, t } = context.i18n.global;

  mergeLocaleMessage('en', {
    linksVersionTitle: 'Application version',
    linksVersionDesc: 'Update the application, see memory usage.',
    linksNotificationsTitle: 'Notifications',
    linksNotificationsDesc: 'Configure notifications.',
  });
  mergeLocaleMessage('fr', {
    linksVersionTitle: 'Version de l\'application',
    linksVersionDesc: 'Mettez à jour l\'application, consultez l\'utilisation de la mémoire.',
    linksNotificationsTitle: 'Notifications',
    linksNotificationsDesc: 'Configurez les notifications.',
  });

  // Register settings links
  const settingsLinks = computed(() => ([
    {
      title: t('linksVersionTitle'),
      subtitle: t('linksVersionDesc'),
      prependIcon: mdiInformationOutline,
      to: { name: 'Version' }
    },
    ...isNotificationsSupported.value ? [{
      title: t('linksNotificationsTitle'),
      subtitle: t('linksNotificationsDesc'),
      prependIcon: mdiBellOutline,
      to: { name: 'Notifications' }
    }] : [],
  ]));
  settingsStore.registerLinks(settingsLinks);

  window.addEventListener('beforeinstallprompt', (e: any /*BeforeInstallPromptEvent */) => {
    e.preventDefault(); // Don't let the default prompt go
    pwaStore.installDisplay = true;
    pwaStore.installPromptEvent = e;
  });

  pwaStore.updateSW = registerSW({
    /** On need refresh actions. */
    onNeedRefresh() {
      pwaStore.updateDisplay = true;
    },
    immediate: true, // Automatic page reload
  });

  context.router.beforeEach(async (to, from) => {
    if (to.path !== from.path) {
      await postUpdate(to);
    }
  });

  /**
   * Post update actions.
   * @param to Target route.
   */
  const postUpdate = async (to: RouteLocationNormalized) => {
    // Update registration (get latest data to know if we have to update)
    const registration = await navigator.serviceWorker?.getRegistration();
    await registration?.update();

    // If we have to update: update on page change
    if (registration?.active && registration?.waiting) {
      pwaStore.updateLoading = true;
      pwaStore.updateDisplay = true;
      const promise = new Promise<void>(resolve => {
        registration.waiting?.addEventListener('statechange', e => {
          const sw = e.target as ServiceWorker;
          if (sw.state === 'activated') {
            window.location.pathname = to.fullPath;
            resolve();
          } else if (sw.state === 'redundant') {
            resolve();
          }
        });
      });
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      await promise;
    }
  };
};
