import { useIdentityStore, useLanguageStore } from '@amilochau/core-vue3/stores';
import { mdiCardAccountDetailsOutline, mdiChatOutline, mdiCogOutline, mdiHome, mdiOpenInNew, mdiPower } from '@mdi/js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

export const useNavigation = () => {

  const i18n = useI18n();
  const languageStore = useLanguageStore();
  const { language } = storeToRefs(languageStore);
  const identityStore = useIdentityStore();
  const { isAuthenticated } = storeToRefs(identityStore);

  i18n.mergeLocaleMessage('en', {
    home: 'Home',
    settingsAndSupport: 'Settings and support',
    profile: 'Profile',
    login: 'Login',
    settings: 'Settings',
    contact: 'Contact',
  });
  i18n.mergeLocaleMessage('fr', {
    home: 'Accueil',
    settingsAndSupport: 'Paramètres et support',
    profile: 'Profil',
    login: 'Connexion',
    settings: 'Paramètres',
    contact: 'Contact',
  });

  return {
    items: computed(() => [
      { title: i18n.t('home'), prependIcon: mdiHome, to: { name: 'Home' }, exact: true },
    ]),
    appendItems: computed(() => [
      { type: 'subheader', title: i18n.t('settingsAndSupport') },
      ...isAuthenticated.value
        ? [{ title: i18n.t('profile'), prependIcon: mdiCardAccountDetailsOutline, to: { name: 'Profile' } }]
        : [{ title: i18n.t('login'), prependIcon: mdiPower, to: { name: 'Login' } }],
      { title: i18n.t('settings'), prependIcon: mdiCogOutline, to: { name: 'Settings' } },
      { title: i18n.t('contact'), prependIcon: mdiChatOutline, appendIcon: mdiOpenInNew, href: `https://contact.milochau.com/${language.value}?returnUrl=${encodeURIComponent(window.location.href)}`, target: '_blank', rel: 'noopener noreferrer' },
    ]),
  };
};
