import { useIdentityStore, useLanguageStore } from '@amilochau/core-vue3/stores';
import { mdiCardAccountDetailsOutline, mdiChatOutline, mdiCogOutline, mdiHome, mdiOpenInNew, mdiPower } from '@mdi/js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

export const useNavigation = () => {

  const { t, mergeLocaleMessage } = useI18n();
  const languageStore = useLanguageStore();
  const { language } = storeToRefs(languageStore);
  const identityStore = useIdentityStore();
  const { isAuthenticated } = storeToRefs(identityStore);

  mergeLocaleMessage('en', {
    home: 'Home',
    settingsAndSupport: 'Settings and support',
    profile: 'Profile',
    login: 'Login',
    settings: 'Settings',
    contact: 'Contact',
  });
  mergeLocaleMessage('fr', {
    home: 'Accueil',
    settingsAndSupport: 'Paramètres et support',
    profile: 'Profil',
    login: 'Connexion',
    settings: 'Paramètres',
    contact: 'Contact',
  });

  return {
    items: computed(() => [
      { title: t('home'), prependIcon: mdiHome, to: { name: 'Home' }, exact: true },
    ]),
    appendItems: computed(() => [
      { type: 'subheader', title: t('settingsAndSupport') },
      ...isAuthenticated.value
        ? [{ title: t('profile'), prependIcon: mdiCardAccountDetailsOutline, to: { name: 'Profile' } }]
        : [{ title: t('login'), prependIcon: mdiPower, to: { name: 'Login' } }],
      { title: t('settings'), prependIcon: mdiCogOutline, to: { name: 'Settings' } },
      { title: t('contact'), prependIcon: mdiChatOutline, appendIcon: mdiOpenInNew, href: `https://contact.milochau.com/${language.value}?returnUrl=${encodeURIComponent(window.location.href)}`, target: '_blank', rel: 'noopener noreferrer' },
    ]),
  };
};
