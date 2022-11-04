import { mdiGavel, mdiHome } from '@mdi/js'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default computed(() => {

  const { t } = useI18n()

  return [
    { title: t('app.navigation.home'), prependIcon: mdiHome, to: { name: 'Home' } },
    { type: 'divider' },
    { title: t('app.navigation.privacy'), prependIcon: mdiGavel, to: { name: 'Privacy' } },
  ]
})
