import { type PiniaPluginContext, createPinia } from 'pinia';
import type { App } from 'vue';
import type { MilochauCoreOptions } from '../types/options';

/** Additional options for data persistence. */
export interface PersistOptions {
  storage?: 'localStorage' | 'sessionStorage';
}

declare module 'pinia' {
  /** Extended options for pinia stores, including options for data persistence. */
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: PersistOptions;
  }
}

/**
 * Pinia persist.
 * @param param0 Persistence data.
 * @param param0.options Options.
 * @param param0.store Store.
 */
const piniaPersist = ({ options, store }: PiniaPluginContext) => {
  if (options.persist?.storage === 'localStorage') {
    const storageResult = localStorage.getItem(store.$id);

    if (storageResult) {
      store.$patch(JSON.parse(storageResult));
    }

    store.$subscribe(() => {
      localStorage.setItem(store.$id, JSON.stringify(store.$state));
    }, { detached: true, immediate: true, deep: true });
  }
};

/**
 * Register pinia.
 * @param app App instance.
 * @param options Registration options.
 */
export const registerPinia = (app: App, options: MilochauCoreOptions) => {
  const pinia = createPinia()
    .use(piniaPersist);

  app.use(pinia);

  return pinia;
};
