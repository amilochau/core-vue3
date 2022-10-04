import { PublicClientApplication } from '@azure/msal-browser';
import { createPinia, PiniaPluginContext } from 'pinia'
import { markRaw, nextTick } from 'vue';
import { Router } from 'vue-router';
import { msalInstance } from './msal/config';
import router from './router';

export interface PersistOptions {
  storage?: Storage;
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions;
  }

  export interface PiniaCustomProperties {
    router: Router;
    msalInstance: PublicClientApplication;
  }
}

const piniaPersist = ({ options, store }: PiniaPluginContext) => {
  if (options.persist?.storage) {
    const storage = options.persist?.storage !== undefined ? options.persist?.storage : sessionStorage
    const storageResult = storage.getItem(store.$id)

    if (storageResult) {
      store.$patch(JSON.parse(storageResult))
      storage.setItem(store.$id, JSON.stringify(store.$state))
    }

    nextTick().then(() => {
      store.$subscribe(() => {
        storage.setItem(store.$id, JSON.stringify(store.$state))
      }, { detached: true })
    })
  }
}

const piniaRouter = ({ store }: PiniaPluginContext) => {
  store.router = markRaw(router)
}

const piniaMsal = ({ store }: PiniaPluginContext) => {
  store.msalInstance = markRaw(msalInstance);
}

export default createPinia()
  .use(piniaPersist)
  .use(piniaRouter)
  .use(piniaMsal)
