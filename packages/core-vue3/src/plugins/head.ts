import { createHead } from '@vueuse/head'
import { App } from 'vue'
import { MilochauCoreOptions } from '../types/options'

export default {
  install: (app: App, options: MilochauCoreOptions) => {

    const head = createHead()

    app.use(head)

    return head

  }
}
