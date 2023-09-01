import { usePwaStore } from '../stores'
import { registerSW } from 'virtual:pwa-register'
import { type Router } from 'vue-router'

const messageSW = (serviceWorker: ServiceWorker, data: {}): Promise<any> => {
  return new Promise(resolve => {
    const messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event: MessageEvent) => {
      resolve(event.data)
    }
    serviceWorker.postMessage(data, [messageChannel.port2])
  })
}

export const registerPwa = (context: { router: Router }) => {
  const pwaStore = usePwaStore()

  pwaStore.updateSW = registerSW({
    async onNeedRefresh() {
      const registration = await navigator.serviceWorker?.getRegistration()
      if (registration?.active && registration?.waiting) {
        const manifest = await messageSW(registration.active, { type: 'GET_MANIFEST' })
        await messageSW(registration.waiting, { type: 'SET_MANIFEST', manifest })
      }

      pwaStore.display = true
    },
    immediate: true, // Automatic page reload
  })

  context.router.beforeEach(async (to, from) => {
    if (to.path !== from.path) {
      navigator.serviceWorker?.getRegistration().then(registration => {
        registration?.update()
      })
    }
  })
}
