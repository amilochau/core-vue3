import { createHead } from '@unhead/vue';
import type { App } from 'vue';

/**
 * Register @unhead/vue.
 * @param app App instance.
 * @param options Options.
 */
export const registerHead = (app: App) => {
  const head = createHead();
  app.use(head);

  return head;
};
