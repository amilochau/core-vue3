import { useIdentityStore } from '@amilochau/core-vue3'
import { mdiGavel, mdiHome, mdiCogOutline, mdiCardAccountDetailsOutline, mdiPower, mdiChatOutline, mdiOpenInNew } from '@mdi/js'
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
    privacy: 'Privacy',
    contact: 'Contact',
  })
  mergeLocaleMessage('fr', {
    home: 'Accueil',
    settingsAndSupport: 'Paramètres et support',
    profile: 'Profil',
    login: 'Connexion',
    settings: 'Paramètres',
    privacy: 'Confidentialité',
    contact: 'Contact',
  })

  const contactUrl = computed(() => `https://contact.milochau.com/${route.params.lang}?returnUrl=${encodeURIComponent(window.location.href)}`)

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
      { title: t('privacy'), prependIcon: mdiGavel, to: { name: 'Privacy' } },
      { title: t('contact'), prependIcon: mdiChatOutline, appendIcon: mdiOpenInNew, href: contactUrl.value, target: "_blank", rel: "noopener" },
    ],
  }
})
