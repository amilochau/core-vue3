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
              :label="t('sections.inputs.variants.default')" />
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
              :label="t('sections.inputs.variants.default')" />
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
              :label="t('sections.inputs.variants.default')" />
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
              :label="t('sections.inputs.variants.default')" />
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
              :values="values" />
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
              :colors="colors" />
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
              :icons="icons" />
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
              :label="t('sections.inputs.variants.default')" />
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
                clearable />
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

const values: ComputedRef<FormattedDataWithValue<TestEnum>[]> = computed(() => [
  { value: TestEnum.First, title: t('text1'), icon: mdiRefresh, color: 'error' },
  { value: TestEnum.Second, title: t('text2'), icon: mdiRefresh, color: 'warning' },
  { value: TestEnum.Third, title: t('text3'), icon: mdiRefresh, color: 'info' },
  { value: TestEnum.Fourth, title: t('text4'), color: 'primary' },
  { value: TestEnum.Fifth, title: t('text5'), icon: mdiRefresh },
  { value: TestEnum.Sixth, title: t('text6') },
]);

const colors = ref(['#000000', '#444444', '#888888', '#BBBBBB', '#FFFFFF']);
const icons: ComputedRef<(FormattedDataWithValue<TestEnum> & { icon: string })[]> = computed(() => [
  { value: TestEnum.First, icon: mdiRefresh, title: t('text1') },
  { value: TestEnum.Second, icon: mdiTree, title: t('text2') },
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
    forms:
      readonly: Readonly form
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
  text3: Text 3
  text4: Text 4
  text5: Text 5
  text6: Text 6
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
    forms:
      readonly: Readonly form
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
  text3: Text 3
  text4: Text 4
  text5: Text 5
  text6: Text 6
</i18n>
