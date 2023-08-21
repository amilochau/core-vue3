import { mdiCog, mdiHome, mdiCogOutline, mdiChatOutline, mdiOpenInNew } from '@mdi/js'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default computed(() => {

  const { t, mergeLocaleMessage } = useI18n()
  const route = useRoute()

  mergeLocaleMessage('en', {
    home: 'Home',
    settingsAndSupport: 'Settings and support',
    settings: 'Settings',
    contact: 'Contact',
  })
  mergeLocaleMessage('fr', {
    home: 'Accueil',
    settingsAndSupport: 'Paramètres et support',
    settings: 'Paramètres',
    contact: 'Contact',
  })

  const contactUrl = computed(() => `https://contact.milochau.com/${route.params.lang}?returnUrl=${encodeURIComponent(window.location.href)}`)

  return {
    items: [
      { title: t('home'), prependIcon: mdiHome, to: { name: 'Home' }, exact: true },
      { title: t('settings'), prependIcon: mdiCog, to: { name: 'Settings' }, exact: true },
    ],
    appendItems: [
      { type: 'subheader', title: t('settingsAndSupport') },
      { title: t('settings'), prependIcon: mdiCogOutline, to: { name: 'Settings' } },
      { title: t('contact'), prependIcon: mdiChatOutline, appendIcon: mdiOpenInNew, href: contactUrl.value, target: "_blank", rel: "noopener" },
    ],
  }
})
