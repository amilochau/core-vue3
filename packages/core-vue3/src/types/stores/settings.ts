import type { RouteLocationRaw } from 'vue-router';

/** Settings store state. */
export type SettingsState = {
  /** Additional settings links. */
  additionalLinks: SettingsLink[];
};

/** Settings link definition. */
export type SettingsLink = {
  /** Link title. */
  title: string;
  /** Link subtitle. */
  subtitle: string;
  /** Link icon. */
  prependIcon: string;
  /** Vue Router destination. */
  to?: RouteLocationRaw;
  /** External URL. */
  href?: string;
  /** Link target. */
  target?: string;
  /** Link rel attribute. */
  rel?: string;
};
