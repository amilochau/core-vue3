import { useI18n } from 'vue-i18n';
import { type FormattedData, type FormattedDataWithValue } from '@amilochau/core-vue3/types';
import { ref } from 'vue'

export const useFormat2 = () => {
  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    test: 'testfrom2',
  })
  mergeLocaleMessage('fr', {
    test: 'testfrom2',
  })

  const tests2 = ref<Record<string, FormattedData>>({
    ['test']: { title: t('test') },
  })

  return {
    tests2,
    formatTest2: (value: string): FormattedDataWithValue<string> => ({ value, ...tests2.value[value] }),
  }
}
