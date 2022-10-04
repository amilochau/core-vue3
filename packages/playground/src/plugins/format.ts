import { FieldType, LayerType, AccessLevel, FieldValidationRuleType } from "../models/business/maps";

import { useI18n } from 'vue-i18n';
import { mdiAccountCancel, mdiAccountCog, mdiAccountEdit, mdiAccountEye, mdiAsterisk, mdiAt, mdiCalendar, mdiCircleOffOutline, mdiFormatFontSizeDecrease, mdiFormatFontSizeIncrease, mdiFormTextarea, mdiFormTextbox } from "@mdi/js";

const defaultIcon = mdiCircleOffOutline

export function formatMapAccessLevel(value: AccessLevel) {
  const { t } = useI18n()
  switch (value) {
    case AccessLevel.Manage:
      return t('enums.accessLevels.manage')
    case AccessLevel.Change:
      return t('enums.accessLevels.change')
    case AccessLevel.Read:
      return t('enums.accessLevels.read')
    default:
      return t('enums.accessLevels.none')
  }
}
export function iconMapAccessLevel(value: AccessLevel) {
  switch (value) {
    case AccessLevel.Manage:
      return mdiAccountCog
    case AccessLevel.Change:
      return mdiAccountEdit
    case AccessLevel.Read:
      return mdiAccountEye
    default:
      return mdiAccountCancel
  }
}
export function colorMapAccessLevel(value: AccessLevel) {
  switch (value) {
    case AccessLevel.Manage:
      return 'success'
    case AccessLevel.Change:
      return 'primary'
    case AccessLevel.Read:
      return 'secondary'
    default:
      return 'error'
  }
}

export function formatFieldType(value: FieldType) {
  const { t } = useI18n()
  switch (value) {
    case FieldType.Text:
      return t('enums.fieldTypes.text')
    case FieldType.Textarea:
      return t('enums.fieldTypes.textarea')
    case FieldType.Date:
      return t('enums.fieldTypes.date')
    default:
      return t('enums.unknown')
  }
}
export function iconFieldType(value: FieldType) {
  switch (value) {
    case FieldType.Text:
      return mdiFormTextbox
    case FieldType.Textarea:
      return mdiFormTextarea
    case FieldType.Date:
      return mdiCalendar
    default:
      return defaultIcon
  }
}

export function formatFieldValidationRuleType(value: FieldValidationRuleType) {
  const { t } = useI18n()
  switch (value) {
    case FieldValidationRuleType.Required:
      return t('enums.fieldValidationRuleTypes.required')
    case FieldValidationRuleType.MinLength:
      return t('enums.fieldValidationRuleTypes.minLength')
    case FieldValidationRuleType.MaxLength:
      return t('enums.fieldValidationRuleTypes.maxLength')
    case FieldValidationRuleType.EmailAddress:
      return t('enums.fieldValidationRuleTypes.emailAddress')
    default:
      return t('enums.unknown')
  }
}

export function iconFieldValidationRuleType(value: FieldValidationRuleType) {
  switch (value) {
    case FieldValidationRuleType.Required:
      return mdiAsterisk
    case FieldValidationRuleType.MinLength:
      return mdiFormatFontSizeIncrease
    case FieldValidationRuleType.MaxLength:
      return mdiFormatFontSizeDecrease
    case FieldValidationRuleType.EmailAddress:
      return mdiAt
    default:
      return defaultIcon
  }
}

export function formatFieldValidationRuleTypeAdd(value: FieldValidationRuleType) {
  const { t } = useI18n()
  switch (value) {
    case FieldValidationRuleType.Required:
      return t('dialogs.maps.settings.defaultFields.rules.add.required')
    case FieldValidationRuleType.MinLength:
      return t('dialogs.maps.settings.defaultFields.rules.add.minLength')
    case FieldValidationRuleType.MaxLength:
      return t('dialogs.maps.settings.defaultFields.rules.add.maxLength')
    case FieldValidationRuleType.EmailAddress:
      return t('dialogs.maps.settings.defaultFields.rules.add.emailAddress')
    default:
      return t('enums.unknown')
  }
}

export function formatLayerType(value: LayerType) {
  const { t } = useI18n()
  switch (value) {
    case LayerType.Roadmap:
      return t('enums.layerTypes.roadmap')
    case LayerType.Satellite:
      return t('enums.layerTypes.satellite')
    case LayerType.Hybrid:
      return t('enums.layerTypes.hybrid')
    case LayerType.Terrain:
      return t('enums.layerTypes.terrain')
    default:
      return t('enums.unknown')
  }
}
