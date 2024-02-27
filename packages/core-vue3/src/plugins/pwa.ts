import { usePwaStore } from '../stores';
import { registerSW } from 'virtual:pwa-register';
import { type RouteLocationNormalized, type Router } from 'vue-router';

export const registerPwa = (context: { router: Router }) => {
  const pwaStore = usePwaStore();

  window.addEventListener('beforeinstallprompt', (e: any /*BeforeInstallPromptEvent */) => {
    e.preventDefault(); // Don't let the default prompt go
    pwaStore.installDisplay = true;
    pwaStore.installPromptEvent = e;
  });

  pwaStore.updateSW = registerSW({
    async onNeedRefresh() {
      pwaStore.updateDisplay = true;
    },
    immediate: true, // Automatic page reload
  });

  context.router.beforeEach(async (to, from) => {
    if (to.path !== from.path) {
      await postUpdate(to);
    }
  });

  const postUpdate = async (to: RouteLocationNormalized) => {
    // Update registration (get latest data to know if we have to update)
    const registration = await navigator.serviceWorker?.getRegistration();
    registration?.update();

    // If we have to update: update on page change
    if (registration?.active && registration?.waiting) {
      pwaStore.updateLoading = true;
      pwaStore.updateDisplay = true;
      const promise = new Promise<void>(resolve => {
        registration!.waiting?.addEventListener('statechange', e => {
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
