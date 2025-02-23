import { PersistOptions } from '../plugins/pinia';
import { useAppStore } from './app';
import { useCookiesStore } from './cookies';
import { useIdentityStore } from './identity';
import { useLanguageStore } from './language';
import { useNotificationsStore } from './notifications';
import { useThemeStore } from './theme';

export {
  useAppStore,
  useCookiesStore,
  useIdentityStore,
  useLanguageStore,
  useNotificationsStore,
  useThemeStore,
};
