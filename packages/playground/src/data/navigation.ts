import { mdiGavel, mdiHome, mdiCog, mdiCardAccountMail, mdiOpenInNew } from '@mdi/js'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default computed(() => {

  const { t, mergeLocaleMessage } = useI18n()
  const route = useRoute()

  mergeLocaleMessage('en', {
    home: 'Home',
    settings: 'Settings',
    privacy: 'Privacy',
    contact: 'Contact',
  })
  mergeLocaleMessage('fr', {
    home: 'Accueil',
    settings: 'Paramètres',
    privacy: 'Confidentialité',
    contact: 'Contact',
  })

  const contactUrl = computed(() => `https://contact.milochau.com/${route.params.lang}?returnUrl=${encodeURIComponent(window.location.href)}`)

  return {
    items: [
      { title: t('home'), prependIcon: mdiHome, to: { name: 'Home' }, exact: true },
      { title: t('settings'), prependIcon: mdiCog, to: { name: 'Settings' }, exact: true },
    ],
    appendItems: [
      { title: t('privacy'), prependIcon: mdiGavel, to: { name: 'Privacy' } },
      { title: t('contact'), prependIcon: mdiCardAccountMail, appendIcon: mdiOpenInNew, href: contactUrl.value, target: "_blank", rel: "noopener" },
    ],
  }
})
