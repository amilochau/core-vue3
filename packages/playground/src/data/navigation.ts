import { mdiGavel, mdiHome } from '@mdi/js'

export default (t: any) => [
  { title: t('app.navigation.home'), prependIcon: mdiHome, to: { name: 'Home' } },
  { type: 'divider' },
  { title: t('app.navigation.privacy'), prependIcon: mdiGavel, to: { name: 'Privacy' } },
]
