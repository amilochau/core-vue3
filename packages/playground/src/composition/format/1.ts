import { useI18n } from 'vue-i18n';
import { type FormattedData, type FormattedDataWithValue } from '@amilochau/core-vue3/types';
import { ref } from 'vue'

export const useFormat1 = () => {
  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    test: 'testfrom1',
  })
  mergeLocaleMessage('fr', {
    test: 'testfrom1',
  })

  const tests1 = ref<Record<string, FormattedData>>({
    ['test']: { title: t('test') },
  })

  return {
    tests1,
    formatTest1: (value: string): FormattedDataWithValue<string> => ({ value, ...tests1.value[value] }),
  }
}
