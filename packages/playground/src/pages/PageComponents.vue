<!-- eslint-disable vue/no-bare-strings-in-template -->
<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('sections.inputs.textField') }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field
              :label="t('sections.inputs.variants.default')"
              hint="This is a hint" />
            <v-text-field
              :label="t('sections.inputs.variants.outlined')"
              variant="outlined" />
            <v-text-field
              :label="t('sections.inputs.variants.clearable')"
              clearable />
            <v-text-field
              :label="t('sections.inputs.variants.prependAppend')">
              <template #prepend>
                <v-icon :icon="mdiRefresh" />
              </template>
              <template #append>
                <v-icon :icon="mdiRefresh" />
              </template>
            </v-text-field>
            <v-text-field
              :label="t('sections.inputs.variants.color')"
              color="error" />
            <v-text-field
              :label="t('sections.inputs.variants.disabled')"
              disabled />
            <v-text-field
              :label="t('sections.inputs.variants.readonly')"
              clearable
              readonly />
          </v-card-text>
          <v-card-text>Badly supported: clearable</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('sections.inputs.fieldNumeric') }}
            </v-card-title>
            <v-card-subtitle>
              Value: {{ { value: numericValue } }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <field-numeric
              v-model="numericValue"
              :label="t('sections.inputs.variants.default')"
              hint="This is a hint" />
            <field-numeric
              v-model="numericValue"
              :label="t('sections.inputs.variants.outlined')"
              variant="outlined" />
            <field-numeric
              v-model="numericValue"
              :label="t('sections.inputs.variants.clearable')"
              clearable />
            <field-numeric
              v-model="numericValue"
              :label="t('sections.inputs.variants.prependAppend')">
              <template #prepend>
                <v-icon :icon="mdiRefresh" />
              </template>
              <template #append>
                <v-icon :icon="mdiRefresh" />
              </template>
            </field-numeric>
            <field-numeric
              v-model="numericValue"
              :label="t('sections.inputs.variants.color')"
              color="error" />
            <field-numeric
              v-model="numericValue"
              :label="t('sections.inputs.variants.disabled')"
              disabled />
            <field-numeric
              v-model="numericValue"
              :label="t('sections.inputs.variants.readonly')"
              clearable
              readonly />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('sections.inputs.fieldDate') }}
            </v-card-title>
            <v-card-subtitle>
              Value: {{ { value: fieldDateValue } }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <field-date
              v-model="fieldDateValue"
              :label="t('sections.inputs.variants.default')"
              hint="This is a hint" />
            <field-date
              v-model="fieldDateValue"
              :label="t('sections.inputs.variants.outlined')"
              variant="outlined" />
            <field-date
              v-model="fieldDateValue"
              :label="t('sections.inputs.variants.clearable')"
              clearable />
            <field-date
              v-model="fieldDateValue"
              :label="t('sections.inputs.variants.prependAppend')">
              <template #prepend>
                <v-icon :icon="mdiRefresh" />
              </template>
              <template #append>
                <v-icon :icon="mdiRefresh" />
              </template>
            </field-date>
            <field-date
              v-model="fieldDateValue"
              :label="t('sections.inputs.variants.color')"
              color="error" />
            <field-date
              v-model="fieldDateValue"
              :label="t('sections.inputs.variants.disabled')"
              disabled />
            <field-date
              v-model="fieldDateValue"
              :label="t('sections.inputs.variants.readonly')"
              clearable
              readonly />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('sections.inputs.switch') }}
            </v-card-title>
            <v-card-subtitle>
              Value: {{ { value: switchValue } }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-switch
              v-model="switchValue"
              :label="t('sections.inputs.variants.default')"
              hint="This is a hint" />
            <v-switch
              v-model="switchValue"
              :label="t('sections.inputs.variants.inset')"
              inset
              hint="This is a hint" />
            <v-switch
              v-model="switchValue"
              :label="t('sections.inputs.variants.prependAppend')">
              <template #prepend>
                <v-icon :icon="mdiRefresh" />
              </template>
              <template #append>
                <v-icon :icon="mdiRefresh" />
              </template>
            </v-switch>
            <v-switch
              v-model="switchValue"
              :label="t('sections.inputs.variants.color')"
              color="error" />
            <v-switch
              v-model="switchValue"
              :label="t('sections.inputs.variants.disabled')"
              disabled />
            <v-switch
              v-model="switchValue"
              :label="t('sections.inputs.variants.readonly')"
              clearable
              readonly />
          </v-card-text>
          <v-card-text>Not supported: outlined (variant), clearable</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('sections.inputs.fieldChipGroup') }}
            </v-card-title>
            <v-card-subtitle>
              Value: {{ { value: fieldChipGroupValue } }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <field-chip-group
              v-model="fieldChipGroupValue"
              :label="t('sections.inputs.variants.default')"
              :values="values"
              hint="This is a hint" />
            <field-chip-group
              v-model="fieldChipGroupValue"
              :label="t('sections.inputs.variants.clearable')"
              :values="values"
              clearable />
            <field-chip-group
              v-model="fieldChipGroupValue"
              :label="t('sections.inputs.variants.prependAppend')"
              :values="values">
              <template #prepend>
                <v-icon :icon="mdiRefresh" />
              </template>
              <template #append>
                <v-icon :icon="mdiRefresh" />
              </template>
            </field-chip-group>
            <field-chip-group
              v-model="fieldChipGroupValue"
              :label="t('sections.inputs.variants.color')"
              :values="values"
              color="error" />
            <field-chip-group
              v-model="fieldChipGroupValue"
              :label="t('sections.inputs.variants.disabled')"
              :values="values"
              disabled />
            <field-chip-group
              v-model="fieldChipGroupValue"
              :label="t('sections.inputs.variants.readonly')"
              :values="values"
              clearable
              readonly />
            <field-chip-group
              v-model="fieldChipGroupValue"
              :label="t('sections.inputs.variants.mandatory')"
              :values="values"
              mandatory />
            <field-chip-group
              v-model="fieldChipGroupValue"
              :label="t('sections.inputs.variants.multiple')"
              :values="values"
              multiple />
            <field-chip-group
              v-model="fieldChipGroupValue"
              :label="t('sections.inputs.variants.filter')"
              :values="values"
              filter />
          </v-card-text>
          <v-card-text>Not supported: outlined (variant)</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('sections.inputs.fieldColorBullets') }}
            </v-card-title>
            <v-card-subtitle>
              Value: {{ { value: fieldColorBulletsValue } }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <field-color-bullets
              v-model="fieldColorBulletsValue"
              :label="t('sections.inputs.variants.default')"
              :colors="colors"
              hint="This is a hint" />
            <field-color-bullets
              v-model="fieldColorBulletsValue"
              :label="t('sections.inputs.variants.clearable')"
              :colors="colors"
              clearable />
            <field-color-bullets
              v-model="fieldColorBulletsValue"
              :label="t('sections.inputs.variants.prependAppend')"
              :colors="colors">
              <template #prepend>
                <v-icon :icon="mdiRefresh" />
              </template>
              <template #append>
                <v-icon :icon="mdiRefresh" />
              </template>
            </field-color-bullets>
            <field-color-bullets
              v-model="fieldColorBulletsValue"
              :label="t('sections.inputs.variants.color')"
              :colors="colors"
              color="primary" />
            <field-color-bullets
              v-model="fieldColorBulletsValue"
              :label="t('sections.inputs.variants.disabled')"
              :colors="colors"
              disabled />
            <field-color-bullets
              v-model="fieldColorBulletsValue"
              :label="t('sections.inputs.variants.readonly')"
              :colors="colors"
              clearable
              readonly />
          </v-card-text>
          <v-card-text>Not supported: outlined (variant)</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('sections.inputs.fieldIcon') }}
            </v-card-title>
            <v-card-subtitle>
              Value: {{ { value: fieldIconValue } }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <field-icon
              v-model="fieldIconValue"
              :label="t('sections.inputs.variants.default')"
              :icons="icons"
              hint="This is a hint" />
            <field-icon
              v-model="fieldIconValue"
              :label="t('sections.inputs.variants.clearable')"
              :icons="icons"
              clearable />
            <field-icon
              v-model="fieldIconValue"
              :label="t('sections.inputs.variants.prependAppend')"
              :icons="icons">
              <template #prepend>
                <v-icon :icon="mdiRefresh" />
              </template>
              <template #append>
                <v-icon :icon="mdiRefresh" />
              </template>
            </field-icon>
            <field-icon
              v-model="fieldIconValue"
              :label="t('sections.inputs.variants.color')"
              :icons="icons"
              color="primary" />
            <field-icon
              v-model="fieldIconValue"
              :label="t('sections.inputs.variants.disabled')"
              :icons="icons"
              disabled />
            <field-icon
              v-model="fieldIconValue"
              :label="t('sections.inputs.variants.readonly')"
              :icons="icons"
              clearable
              readonly />
          </v-card-text>
          <v-card-text>Not supported: outlined (variant)</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('sections.inputs.textarea') }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-textarea
              :label="t('sections.inputs.variants.default')"
              hint="This is a hint" />
            <v-textarea
              :label="t('sections.inputs.variants.outlined')"
              variant="outlined" />
            <v-textarea
              :label="t('sections.inputs.variants.clearable')"
              clearable />
            <v-textarea
              :label="t('sections.inputs.variants.prependAppend')">
              <template #prepend>
                <v-icon :icon="mdiRefresh" />
              </template>
              <template #append>
                <v-icon :icon="mdiRefresh" />
              </template>
            </v-textarea>
            <v-textarea
              :label="t('sections.inputs.variants.color')"
              color="primary" />
            <v-textarea
              :label="t('sections.inputs.variants.disabled')"
              disabled />
            <v-textarea
              :label="t('sections.inputs.variants.readonly')"
              clearable
              readonly />
          </v-card-text>
          <v-card-text>Badly supported: clearable</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-form
          readonly>
          <v-card>
            <v-card-item>
              <v-card-title>
                {{ t('sections.forms.readonly') }}
              </v-card-title>
            </v-card-item>
            <v-card-text>
              <v-text-field
                :label="t('sections.inputs.variants.readonly')"
                clearable
                hint="This is a hint" />
              <field-numeric
                v-model="numericValue"
                :label="t('sections.inputs.variants.readonly')"
                clearable />
              <field-date
                v-model="fieldDateValue"
                :label="t('sections.inputs.variants.readonly')"
                clearable />
              <v-switch
                v-model="switchValue"
                :label="t('sections.inputs.variants.readonly')"
                clearable />
              <field-chip-group
                v-model="fieldChipGroupValue"
                :label="t('sections.inputs.variants.readonly')"
                :values="values"
                clearable />
              <field-color-bullets
                v-model="fieldColorBulletsValue"
                :label="t('sections.inputs.variants.readonly')"
                :colors="colors"
                clearable />
              <field-icon
                v-model="fieldIconValue"
                :label="t('sections.inputs.variants.readonly')"
                :icons="icons"
                clearable />
              <v-textarea
                :label="t('sections.inputs.variants.readonly')"
                clearable />
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-list>
          <v-list-item
            :title="t('longText')"
            :subtitle="t('longText')" />
        </v-list>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-timeline>
          <v-timeline-item>
            {{ t('text1') }}
          </v-timeline-item>
          <v-timeline-item>
            {{ t('text2') }}
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-btn>
          {{ t('text1') }}
        </v-btn>
        <v-btn-action>
          {{ t('text2') }}
        </v-btn-action>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { type ComputedRef, computed, ref } from 'vue';
import { usePage } from '@amilochau/core-vue3/composition';
import { FieldChipGroup, FieldColorBullets, FieldDate, FieldIcon, FieldNumeric } from '@amilochau/core-vue3/components';
import { TestEnum } from '@/types/test';
import { type FormattedDataWithValue } from '@amilochau/core-vue3/types';
import { mdiRefresh, mdiTree } from '@mdi/js';

const { t } = useI18n();
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
  },
  footer: {
    items: [
      {
        title: 'GitHub',
        link: 'https://github.com/amilochau/core-vue3',
      },
    ],
  },
})));

const numericValue = ref<number>();
const fieldDateValue = ref<string>();
const switchValue = ref(false);
const fieldChipGroupValue = ref<TestEnum>(TestEnum.First);
const fieldColorBulletsValue = ref<string | undefined>();
const fieldIconValue = ref<TestEnum | undefined>();

const values: ComputedRef<FormattedDataWithValue<number>[]> = computed(() => [
  { value: 1, title: t('options.error'), icon: mdiRefresh, color: 'error' },
  { value: 2, title: t('options.warning'), icon: mdiRefresh, color: 'warning' },
  { value: 3, title: t('options.info'), icon: mdiRefresh, color: 'info' },
  { value: 4, title: t('options.withoutIcon'), color: 'primary' },
  { value: 5, title: t('options.withoutColor'), icon: mdiRefresh },
  { value: 6, title: t('options.masked'), masked: true },
  { value: 7, title: t('options.masked'), masked: true },
  { value: 8, title: t('options.hidden'), hidden: true },
  { value: 9, title: t('options.default') },
  { value: 10, icon: mdiRefresh },
]);

const colors = ref(['#000', '#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#AAA', '#BBB', '#CCC', '#DDD', '#EEE', '#FFF']);
const icons: ComputedRef<(FormattedDataWithValue<TestEnum> & { icon: string })[]> = computed(() => [
  { value: TestEnum.First, icon: mdiRefresh },
  { value: TestEnum.Second, icon: mdiTree },
]);
</script>

<i18n lang="yaml">
en:
  pageTitle: Components
  pageDescription: Components test page
fr:
  pageTitle: Composants
  pageDescription: Page de test de composants
</i18n>

<i18n lang="yaml">
en:
  sections:
    inputs:
      title: Inputs
      textField: Text Field
      textarea: Textarea
      switch: Switch
      fieldChipGroup: Field Chip Group
      fieldColorBullets: Field Color Bullets
      fieldIcon: Field Icon
      fieldNumeric: Field Numeric
      fieldDate: Field Date
      variants:
        default: Default
        outlined: Outlined
        clearable: Clearable
        prependAppend: With append and prepend
        color: Color
        disabled: Disabled
        readonly: Readonly (+ Clearable)
        mandatory: Mandatory
        multiple: Multiple
        inset: Inset
        filter: Filter
    forms:
      readonly: Readonly form
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  options:
    default: default
    error: error
    warning: warning
    info: info
    withoutIcon: without icon
    withoutColor: without color
    masked: masked
    hidden: hidden
  text1: Text 1
  text2: Text 2
fr:
  sections:
    inputs:
      title: Inputs
      textField: Text Field
      textarea: Textarea
      switch: Switch
      fieldChipGroup: Field Chip Group
      fieldColorBullets: Field Color Bullets
      fieldIcon: Field Icon
      fieldNumeric: Field Numeric
      fieldDate: Field Date
      variants:
        default: Default
        outlined: Outlined
        clearable: Clearable
        prependAppend: With append and prepend
        color: Color
        disabled: Disabled
        readonly: Readonly (+ Clearable)
        mandatory: Mandatory
        multiple: Multiple
        inset: Inset
        filter: Filter
    forms:
      readonly: Readonly form
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  options:
    default: default
    error: error
    warning: warning
    info: info
    withoutIcon: without icon
    withoutColor: without color
    masked: masked
    hidden: hidden
  text1: Text 1
  text2: Text 2
</i18n>
