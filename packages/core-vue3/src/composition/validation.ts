import { useI18n } from 'vue-i18n'

export const useValidationRules = () => {
  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    required: 'This field is required.',
    minLength: 'This field must be more than {min} characters.',
    maxLength: 'This field must be less than {max} characters.',
    emailAddress: 'This field must be a valid email address.',
    date: 'This field must be a valid date.',
    url: 'This field must be a valid URL',
    minValue: 'This field must be upper than {min}.',
    maxValue: 'This field must be lower than {max}.',
  })
  mergeLocaleMessage('fr', {
    required: 'Ce champ est requis.',
    minLength: 'Ce champ doit faire plus de {min} caractères.',
    maxLength: 'Ce champ doit faire moins de {max} caractères.',
    emailAddress: 'Ce champ doit correspondre à une adresse email valide.',
    date: 'Ce champ doit correspondre à une date valide.',
    url: 'Ce champ doit correspondre à une URL valide.',
    minValue: 'Ce champ doit être supérieur à {min}.',
    maxValue: 'Ce champ doit être inférieur à {max}.',
  })

  return {
    required: () => (v: any) => {
      if (typeof v === 'string') {
        return (v !== null && v !== undefined && v.trim() !== '') || t('required')
      } else {
        return (v !== null && v !== undefined) || t('required')
      }
    },
    minLength: (min: number) => (v: any) => !v || v.length >= min || t('minLength', { min }),
    maxLength: (max: number) => (v: any) => !v || v.length <= max || t('maxLength', { max }),
    emailAddress: () => (v: any) => !v || /.+@.+\..+/.test(v) || t('emailAddress'),
    date: () => (v: any) => !v || (!isNaN(Date.parse(v)) && /^\d{4}-\d{2}-\d{2}$/.test(v)) || t('date'),
    url: () => (v: any) => {
      if (!v) {
        return true
      }
      let url;
      try {
        url = new URL(v);
      } catch (_) {
        return t('url')
      }
      return url.protocol === 'http:' || url.protocol === 'https:' || t('url')
    },
    minValue: (min: number) => (v: any) => {
      if (v === null || v === undefined) {
        return true;
      }
      const floatValue = parseFloat(v)
      return floatValue >= min || t('minValue', { min })
    },
    maxValue: (max: number) => (v: any) => {
      if (v === null || v === undefined) {
        return true;
      }
      const floatValue = parseFloat(v)
      return floatValue <= max || t('maxValue', { max })
    },
  }
}
