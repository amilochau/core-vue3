import { createHead } from '@unhead/vue';
import type { App } from 'vue';
import type { CoreVue3Options } from '../types/options';

/**
 * Register @unhead/vue.
 * @param app App instance.
 * @param options Options.
 */
export const registerHead = (app: App, options: CoreVue3Options) => {
  const head = createHead();
  app.use(head);

  return head;
};
