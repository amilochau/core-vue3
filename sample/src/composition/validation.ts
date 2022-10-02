import { useI18n } from "vue-i18n"

export function useValidationRules() {
  const { t } = useI18n()

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
    minValue,
    maxValue
  }
}
