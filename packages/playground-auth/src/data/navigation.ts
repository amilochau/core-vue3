import { useIdentityStore } from '@amilochau/core-vue3/stores'
import { mdiCardAccountDetailsOutline, mdiChatOutline, mdiCogOutline, mdiHome, mdiOpenInNew, mdiPower } from '@mdi/js'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';

export default computed(() => {

  const { t, mergeLocaleMessage } = useI18n()
  const route = useRoute()
  const identityStore = useIdentityStore()
  const { isAuthenticated } = storeToRefs(identityStore)

  mergeLocaleMessage('en', {
    home: 'Home',
    settingsAndSupport: 'Settings and support',
    profile: 'Profile',
    login: 'Login',
    settings: 'Settings',
    contact: 'Contact',
  })
  mergeLocaleMessage('fr', {
    home: 'Accueil',
    settingsAndSupport: 'Paramètres et support',
    profile: 'Profil',
    login: 'Connexion',
    settings: 'Paramètres',
    contact: 'Contact',
  })

  const contactUrl = `https://contact.milochau.com/${route.params.lang}?returnUrl=${encodeURIComponent(window.location.href)}`

  return {
    items: [
      { title: t('home'), prependIcon: mdiHome, to: { name: 'Home' }, exact: true },
    ],
    appendItems: [
      { type: 'subheader', title: t('settingsAndSupport') },
      ...isAuthenticated.value
        ? [{ title: t('profile'), prependIcon: mdiCardAccountDetailsOutline, to: { name: 'Profile' } }]
        : [{ title: t('login'), prependIcon: mdiPower, to: { name: 'Login' } }],
      { title: t('settings'), prependIcon: mdiCogOutline, to: { name: 'Settings' } },
      { title: t('contact'), prependIcon: mdiChatOutline, appendIcon: mdiOpenInNew, href: contactUrl, target: '_blank', rel: 'noopener noreferrer' },
    ],
  }
})
