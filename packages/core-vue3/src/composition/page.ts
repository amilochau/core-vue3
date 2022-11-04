import { useI18n } from "vue-i18n";
import { useHead } from '@vueuse/head';
import { useCoreOptions } from './options';
import { computed, Ref } from "vue";

export function usePage(args?: Ref<any>) {

  const { t, te } = useI18n()
  const coreOptions = useCoreOptions()

  const pageTitle = computed(() => te('pageTitle', args?.value) && t('pageTitle', args?.value) ? `${t('pageTitle', args?.value)} — ${coreOptions.application.name}` : coreOptions.application.name)
  const pageDescription = computed(() => te('pageDescription', args?.value) && t('pageDescription', args?.value) ? `${t('pageDescription', args?.value)} — ${coreOptions.application.name}` : coreOptions.application.name)

  useHead({
    title: pageTitle,
    meta: [
      {
        name: 'description',
        content: pageDescription
      }
    ]
  })
}
