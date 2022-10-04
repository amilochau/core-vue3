import { createHead } from '@vueuse/head'
import { App } from 'vue'
import { MilochauCoreOptions } from '../types/options'

const coreCreateHeadPlugin = {
  install(app: App, options: MilochauCoreOptions) {

    const head = createHead()

    app.use(head)

    return head
    
  }
}
    
export default coreCreateHeadPlugin
