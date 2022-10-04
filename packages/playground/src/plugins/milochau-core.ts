// This page must use the published package in real applications
import { createMilochauCore } from '@amilochau/core-vue3'

import en from '../data/lang/en.json'
import fr from '../data/lang/fr.json'

const milochauCore = createMilochauCore({
  messages: {
    en,
    fr
  }
})

export default milochauCore
