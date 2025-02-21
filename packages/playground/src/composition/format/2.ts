import { useI18n } from 'vue-i18n';
import { type FormattedData, type FormattedDataWithValue } from '@amilochau/core-vue3/types';
import { ref } from 'vue';

export const useFormat2 = () => {
  const i18n = useI18n();

  i18n.mergeLocaleMessage('en', {
    test: 'testfrom2',
  });
  i18n.mergeLocaleMessage('fr', {
    test: 'testfrom2',
  });

  const tests2 = ref<Record<string, FormattedData>>({
    ['test']: { title: i18n.t('test') },
  });

  return {
    tests2,
    formatTest2: (value: string): FormattedDataWithValue<string> => ({ value, ...tests2.value[value] }),
  };
};
