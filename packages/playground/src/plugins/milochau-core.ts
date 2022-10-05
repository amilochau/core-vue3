// This page must use the published package in real applications
import { createMilochauCore } from '@amilochau/core-vue3'
import { coreOptions } from '../data/config'

console.log('playground - milochaucoreplugin - start')

const milochauCore = createMilochauCore(coreOptions)

export default milochauCore

console.log('playground - milochaucoreplugin - end')
