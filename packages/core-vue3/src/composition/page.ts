import { useI18n } from "vue-i18n";
import { useHead } from '@vueuse/head';
import { useCoreOptions } from './options';

export function usePage(args?: any) {

  const { t } = useI18n()
  const coreOptions = useCoreOptions()

  useHead({
    title: `${t('pageTitle', args)} — ${coreOptions.application.name}`,
    meta: [
      {
        name: 'description',
        content: `${t('pageDescription', args)} — ${coreOptions.application.name}`
      }
    ]
  })
}
