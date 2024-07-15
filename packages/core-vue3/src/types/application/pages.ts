import type { RouteLocationRaw } from 'vue-router';

/** Data specific to a page. */
export type PageData = {
  title: string;
  description: string;
  noindex?: boolean;
  header?: {
    title?: string;
    contentMode?: 'title' | 'img';
    contentTo?: RouteLocationRaw;
    buttonMode?: 'drawer' | 'back' | 'default-back';
    backTo?: RouteLocationRaw;
    defaultBackTo?: RouteLocationRaw;
  };
  footer?: {
    items?: {
      link: string,
      title: string,
    }[]
  };
};
