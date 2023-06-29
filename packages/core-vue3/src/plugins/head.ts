import { createHead } from '@vueuse/head'
import type { App } from 'vue'
import type { MilochauCoreOptions } from '../types/options'

export const registerHead = (app: App, options: MilochauCoreOptions) => {
  const head = createHead()
  app.use(head)

  return head
}
