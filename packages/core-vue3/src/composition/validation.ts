import { useI18n } from "vue-i18n"

export function useValidationRules() {
  const { t, mergeLocaleMessage } = useI18n()

  mergeLocaleMessage('en', {
    validation: {
      required: "This field is required.",
      minLength: "This field must be more than {min} characters.",
      maxLength: "This field must be less than {max} characters.",
      emailAddress: "This field must be a valid email address.",
      date: "This field must be a valid date.",
      minValue: "This field must be upper than {min}.",
      maxValue: "This field must be lower than {max}."
    }
  })
  mergeLocaleMessage('fr', {
    validation: {
      required: "Ce champ est requis.",
      minLength: "Ce champ doit faire plus de {min} caractères.",
      maxLength: "Ce champ doit faire moins de {max} caractères.",
      emailAddress: "Ce champ doit correspondre à une adresse email valide.",
      date: "Ce champ doit correspondre à une date valide.",
      minValue: "Ce champ doit être supérieur à {min}.",
      maxValue: "Ce champ doit être inférieur à {max}."
    }
  })

  const required = () => (v: any) => {
    if (typeof v === 'string') {
      return (v !== null && v !== undefined && v.trim() !== '') || t('validation.required')
    } else {
      return (v !== null && v !== undefined) || t('validation.required')
    }
  }
  const minLength = (min: number) => (v: any) => !v || v.length >= min || t('validation.minLength', { min })
  const maxLength = (max: number) => (v: any) => !v || v.length <= max || t('validation.maxLength', { max })
  const emailAddress = () => (v: any) => !v || /.+@.+\..+/.test(v) || t('validation.emailAddress')
  const date = () => (v: any) => !v || (!isNaN(Date.parse(v)) && /^\d{4}-\d{2}-\d{2}$/.test(v)) || t('validation.date')
  const minValue = (min: number) => (v: any) => {
    if (v === null || v === undefined) {
      return true;
    }
    const floatValue = parseFloat(v)
    return floatValue >= min || t('validation.minValue', { min })
  }
  const maxValue = (max: number) => (v: any) => {
    if (v === null || v === undefined) {
      return true;
    }
    const floatValue = parseFloat(v)
    return floatValue <= max || t('validation.maxValue', { max })
  }

  return {
    required,
    minLength,
    maxLength,
    emailAddress,
    date,
    minValue,
    maxValue
  }
}
