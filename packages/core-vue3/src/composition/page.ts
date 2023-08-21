import { useI18n } from "vue-i18n";
import { useHead } from '@vueuse/head';
import { useCoreOptions } from './options';
import { computed, ref, watch, type ComputedRef } from "vue";
import { useAppStore } from "../stores";
import type { PageData } from "../types";

export const usePage = (pageData: ComputedRef<PageData>) => {
  const { locale } = useI18n()
  const coreOptions = useCoreOptions()
  const appStore = useAppStore()

  watch(pageData, () => {
    appStore.pageData = pageData.value
  }, { immediate: true, deep: true })

  const appTitle = computed(() => coreOptions.i18n.messages[locale.value].appTitle)
  const pageTitle = computed(() => pageData.value.title ? `${pageData.value.title} — ${appTitle.value}` : appTitle.value)

  const meta = computed(() => ([
    {
      name: 'description',
      content: pageData.value.description ? `${pageData.value.description} — ${appTitle.value}` : appTitle.value,
    },
    ...!coreOptions.application.isProduction || pageData.value.noindex ? [{
      name: 'robots',
      content: ref('noindex'),
    }] : []
  ]))

  useHead({
    title: pageTitle,
    meta: meta.value
  })
}
