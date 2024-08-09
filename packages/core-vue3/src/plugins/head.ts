import { createHead } from '@unhead/vue';
import type { App } from 'vue';
import type { CoreOptions } from '../types/options';

/**
 * Register @unhead/vue.
 * @param app App instance.
 * @param coreOptions Core options.
 */
export const registerHead = (app: App, coreOptions: CoreOptions) => {
  const head = createHead();
  app.use(head);

  return head;
};
