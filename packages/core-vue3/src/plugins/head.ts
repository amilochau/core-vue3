import { createHead } from '@unhead/vue';
import type { App } from 'vue';
import type { MilochauCoreOptions } from '../types/options';

/**
 * Register @unhead/vue.
 * @param app App instance.
 * @param options Registration options.
 */
export const registerHead = (app: App, options: MilochauCoreOptions) => {
  const head = createHead();
  app.use(head);

  return head;
};
