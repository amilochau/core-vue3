import { useLanguageStore } from '@amilochau/core-vue3/stores';
import { mdiChatOutline, mdiCog, mdiCogOutline, mdiHome, mdiOpenInNew } from '@mdi/js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

export const useNavigation = () => {

  const i18n = useI18n();
  const languageStore = useLanguageStore();
  const { language } = storeToRefs(languageStore);

  i18n.mergeLocaleMessage('en', {
    home: 'Home',
    settingsAndSupport: 'Settings and support',
    settings: 'Settings',
    contact: 'Contact',
  });
  i18n.mergeLocaleMessage('fr', {
    home: 'Accueil',
    settingsAndSupport: 'Paramètres et support',
    settings: 'Paramètres',
    contact: 'Contact',
  });

  return {
    items: computed(() => [
      { title: i18n.t('home'), prependIcon: mdiHome, to: { name: 'Home' }, exact: true },
      { title: i18n.t('settings'), prependIcon: mdiCog, to: { name: 'Settings' }, exact: true },
    ]),
    appendItems: computed(() => [
      { type: 'subheader', title: i18n.t('settingsAndSupport') },
      { title: i18n.t('settings'), prependIcon: mdiCogOutline, to: { name: 'Settings' } },
      { title: i18n.t('contact'), prependIcon: mdiChatOutline, appendIcon: mdiOpenInNew, href: `https://contact.milochau.com/${language.value}?returnUrl=${encodeURIComponent(window.location.href)}`, target: '_blank', rel: 'noopener noreferrer' },
    ]),
  };
};
