import type { RouteMeta } from 'vue-router';

/**
 * Generate metadata info from a route context.
 * @param routePath Route path.
 * @param routeMeta Route meta.
 * @param locale Locale.
 */
export const generateMetadataInfo = (routePath: string, routeMeta: RouteMeta, locale: string) => {
  const metadata: any = routeMeta.metadata ?? { en: { title: undefined, description: undefined }, fr: { title: undefined, description: undefined } };
  const localeMetadata = metadata[locale as 'en' | 'fr'] ?? {};

  return {
    title: localeMetadata.title ?? '',
    meta: [
      ...localeMetadata.description ? [{ name: 'description', content: localeMetadata.description }] : [],
      ...localeMetadata.title ? [{ property: 'og:title', content: localeMetadata.title }] : [],
      ...localeMetadata.description ? [{ property: 'og:description', content: localeMetadata.description }] : [],
      { property: 'og:locale', content: locale },
      ...['en', 'fr'].filter(x => x !== locale).map(x => ({ property: 'og:locale:alternate', content: x })),
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'milochau.com' },
      { property: 'og:image', content: 'https://milochau.com/img/icons/android-chrome-512x512.png' },
      { property: 'og:image:alt', content: 'Logo' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '512' },
      { property: 'og:image:height', content: '512' },
      { property: 'og:url', content: `https://milochau.com${routePath}` },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'keywords', content: 'milochau.com' },
      { name: 'author', content: 'Antoine Milochau' },
      ...routeMeta.noindex ? [{ name: 'robots', content: 'noindex' }] : [],
    ] as Record<string, string>[],
  };
};
