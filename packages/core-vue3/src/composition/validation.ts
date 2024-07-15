import { useI18n } from 'vue-i18n';

/** Use validation rules. */
export const useValidationRules = () => {
  const { t, mergeLocaleMessage } = useI18n();

  mergeLocaleMessage('en', {
    required: 'This field is required.',
    minLength: 'This field must be more than {min} characters.',
    maxLength: 'This field must be less than {max} characters.',
    emailAddress: 'This field must be a valid email address.',
    date: 'This field must be a valid date.',
    url: 'This field must be a valid URL',
    minValue: 'This field must be upper than {min}.',
    maxValue: 'This field must be lower than {max}.',
    number: 'This field must be a number.',
    integer: 'This field must be an integer.',
  });
  mergeLocaleMessage('fr', {
    required: 'Ce champ est requis.',
    minLength: 'Ce champ doit faire plus de {min} caractères.',
    maxLength: 'Ce champ doit faire moins de {max} caractères.',
    emailAddress: 'Ce champ doit correspondre à une adresse email valide.',
    date: 'Ce champ doit correspondre à une date valide.',
    url: 'Ce champ doit correspondre à une URL valide.',
    minValue: 'Ce champ doit être supérieur à {min}.',
    maxValue: 'Ce champ doit être inférieur à {max}.',
    number: 'Ce champ doit être un nombre.',
    integer: 'Ce champ doit être un nombre entier.',
  });

  return {
    /** Validates that a required value exists. */
    required: () => (v: any) => {
      if (typeof v === 'string') {
        return (v !== null && v !== undefined && v.trim() !== '') || t('required');
      } else {
        return (v !== null && v !== undefined) || t('required');
      }
    },
    /**
     * Validates that a value is longer that @param min.
     * @param min Minimal length.
     */
    minLength: (min: number) => (v: any) => !v || v.length >= min || t('minLength', { min }),
    /**
     * Validates that a value is shorted that @param max.
     * @param max Maximal length.
     */
    maxLength: (max: number) => (v: any) => !v || v.length <= max || t('maxLength', { max }),
    /** Validates that a value is an email address. */
    emailAddress: () => (v: any) => !v || /.+@.+\..+/.test(v) || t('emailAddress'),
    /** Validates that a value is a date. */
    date: () => (v: any) => !v || (!isNaN(Date.parse(v)) && /^\d{4}-\d{2}-\d{2}$/.test(v)) || t('date'),
    /** Validates that a value is an URL. */
    url: () => (v: any) => {
      if (!v) {
        return true;
      }
      let url;
      try {
        url = new URL(v);
      } catch (_) {
        return t('url');
      }
      return url.protocol === 'http:' || url.protocol === 'https:' || t('url');
    },
    /**
     * Validates that a value is higher that @param min.
     * @param min Minimal value.
     */
    minValue: (min: number) => (v: any) => {
      if (v === null || v === undefined) {
        return true;
      }
      const floatValue = parseFloat(v);
      return floatValue >= min || t('minValue', { min });
    },
    /**
     * Validates that a value is lower that @param max.
     * @param max Maximal value.
     */
    maxValue: (max: number) => (v: any) => {
      if (v === null || v === undefined) {
        return true;
      }
      const floatValue = parseFloat(v);
      return floatValue <= max || t('maxValue', { max });
    },
    /** Validates that a value is a number. */
    number: () => (v: string) => !v || !isNaN(Number(v.replace(',', '.'))) || t('number'),
    /** Validates that a value is an integer. */
    integer: () => (v: string) => {
      if (!v) {
        return true;
      }
      const parsedValue = Number(v.replace(',', '.'));
      return isNaN(parsedValue) || parsedValue % 1 === 0 || t('integer');
    },
  };
};
