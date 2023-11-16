import { usePwaStore } from '../stores';
import { registerSW } from 'virtual:pwa-register';
import { type Router } from 'vue-router';

const messageSW = (serviceWorker: ServiceWorker, data: {}): Promise<any> => {
  return new Promise(resolve => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event: MessageEvent) => {
      resolve(event.data);
    };
    serviceWorker.postMessage(data, [messageChannel.port2]);
  });
};

export const registerPwa = (context: { router: Router }) => {
  const pwaStore = usePwaStore();

  window.addEventListener('beforeinstallprompt', (e: any /*BeforeInstallPromptEvent */) => {
    e.preventDefault(); // Don't let the default prompt go
    pwaStore.installDisplay = true;
    pwaStore.installPromptEvent = e;
  });

  pwaStore.updateSW = registerSW({
    async onNeedRefresh() {
      const registration = await navigator.serviceWorker?.getRegistration();
      if (registration?.active && registration?.waiting) {
        const manifest = await messageSW(registration.active, { type: 'GET_MANIFEST' });
        await messageSW(registration.waiting, { type: 'SET_MANIFEST', manifest });
      }

      pwaStore.updateDisplay = true;
    },
    immediate: true, // Automatic page reload
  });

  let registration: ServiceWorkerRegistration | undefined;
  context.router.beforeEach(async (to, from) => {
    if (to.path !== from.path) {
      // Update registration (get latest data to know if we have to update)
      navigator.serviceWorker?.getRegistration().then(r => {
        registration = r;
        r?.update();
      });

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
        await messageSW(registration.waiting, { type: 'SKIP_WAITING' });
        await promise;
      }
    }
  });
};
