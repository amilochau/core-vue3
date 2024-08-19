<!-- eslint-disable vue/no-bare-strings-in-template -->
<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-text>
            <card-section-title
              :icon="mdiListBox"
              title="Form settings" />
            <v-switch
              v-model="settings.form.readonly"
              label="Readonly"
              density="compact" />
            <card-section-title
              :icon="mdiFormTextbox"
              title="Inputs settings" />
            <v-text-field
              v-model="settings.hint"
              label="Hint"
              density="compact" />
            <v-switch
              v-model="settings.clearable"
              label="Clearable"
              density="compact" />
            <v-switch
              v-model="settings.disabled"
              label="Disabled"
              density="compact" />
            <v-switch
              v-model="settings.readonly"
              label="Readonly"
              density="compact" />
            <field-chip-group
              v-model="settings.variant"
              label="Color"
              :values="[{ value: 'filled', title: 'Filled' }, { value: 'outlined', title: 'Outlined' }, { value: 'plain', title: 'Plain' }, { value: 'underlined', title: 'Underlined' }, { value: 'solo', title: 'Solo' }, { value: 'solo-inverted', title: 'Solo inverted' }, { value: 'solo-filled', title: 'Solo filled' }]"
              clearable />
            <field-chip-group
              v-model="settings.color"
              label="Color"
              :values="[{ value: 'success', title: 'Success', color: 'success' }, { value: 'warning', title: 'Warning', color: 'warning' }, { value: 'error', title: 'Error', color: 'error' }]"
              clearable />
            <v-switch
              v-model="settings.prepend"
              label="Prepend icon"
              density="compact" />
            <v-switch
              v-model="settings.append"
              label="Append icon"
              density="compact" />

            <i>Only for FieldChipGroup:</i>
            <v-switch
              v-model="settings.mandatory"
              label="Mandatory"
              density="compact" />
            <i>Only for FieldChipGroup, FieldFile:</i>
            <v-switch
              v-model="settings.multiple"
              label="Multiple"
              density="compact" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-text>
            <v-form
              :readonly="settings.form.readonly">
              <v-text-field
                label="VTextField"
                :hint="settings.hint"
                :variant="settings.variant"
                :color="settings.color"
                :clearable="settings.clearable"
                :disabled="settings.disabled"
                :readonly="settings.readonly">
                <template
                  v-if="settings.prepend"
                  #prepend>
                  <v-icon :icon="mdiRefresh" />
                </template>
                <template
                  v-if="settings.append"
                  #append>
                  <v-icon :icon="mdiRefresh" />
                </template>
              </v-text-field>
              <v-textarea
                label="VTextarea"
                :hint="settings.hint"
                :variant="settings.variant"
                :color="settings.color"
                :clearable="settings.clearable"
                :disabled="settings.disabled"
                :readonly="settings.readonly">
                <template
                  v-if="settings.prepend"
                  #prepend>
                  <v-icon :icon="mdiRefresh" />
                </template>
                <template
                  v-if="settings.append"
                  #append>
                  <v-icon :icon="mdiRefresh" />
                </template>
              </v-textarea>
              <field-numeric
                v-model="numericValue"
                label="FieldNumeric"
                :hint="settings.hint"
                :variant="settings.variant"
                :color="settings.color"
                :clearable="settings.clearable"
                :disabled="settings.disabled"
                :readonly="settings.readonly">
                <template
                  v-if="settings.prepend"
                  #prepend>
                  <v-icon :icon="mdiRefresh" />
                </template>
                <template
                  v-if="settings.append"
                  #append>
                  <v-icon :icon="mdiRefresh" />
                </template>
              </field-numeric>
              <field-date
                v-model="fieldDateValue"
                label="FieldDate"
                :hint="settings.hint"
                :variant="settings.variant"
                :color="settings.color"
                :clearable="settings.clearable"
                :disabled="settings.disabled"
                :readonly="settings.readonly">
                <template
                  v-if="settings.prepend"
                  #prepend>
                  <v-icon :icon="mdiRefresh" />
                </template>
                <template
                  v-if="settings.append"
                  #append>
                  <v-icon :icon="mdiRefresh" />
                </template>
              </field-date>
              <v-switch
                v-model="switchValue"
                label="VSwitch"
                :hint="settings.hint"
                :variant="settings.variant"
                :color="settings.color"
                :clearable="settings.clearable"
                :disabled="settings.disabled"
                :readonly="settings.readonly">
                <template
                  v-if="settings.prepend"
                  #prepend>
                  <v-icon :icon="mdiRefresh" />
                </template>
                <template
                  v-if="settings.append"
                  #append>
                  <v-icon :icon="mdiRefresh" />
                </template>
              </v-switch>
              <field-chip-group
                v-model="fieldChipGroupValue"
                label="FieldChipGroup"
                :values="values"
                :hint="settings.hint"
                :variant="settings.variant"
                :color="settings.color"
                :clearable="settings.clearable"
                :disabled="settings.disabled"
                :readonly="settings.readonly"
                :mandatory="settings.mandatory"
                :multiple="settings.multiple">
                <template
                  v-if="settings.prepend"
                  #prepend>
                  <v-icon :icon="mdiRefresh" />
                </template>
                <template
                  v-if="settings.append"
                  #append>
                  <v-icon :icon="mdiRefresh" />
                </template>
              </field-chip-group>
              <field-color-bullets
                v-model="fieldColorBulletsValue"
                label="FieldColorBullets"
                :colors="colors"
                :hint="settings.hint"
                :variant="settings.variant"
                :color="settings.color"
                :clearable="settings.clearable"
                :disabled="settings.disabled"
                :readonly="settings.readonly">
                <template
                  v-if="settings.prepend"
                  #prepend>
                  <v-icon :icon="mdiRefresh" />
                </template>
                <template
                  v-if="settings.append"
                  #append>
                  <v-icon :icon="mdiRefresh" />
                </template>
              </field-color-bullets>
              <field-icon
                v-model="fieldIconValue"
                label="FieldIcon"
                :icons="icons"
                :hint="settings.hint"
                :variant="settings.variant"
                :color="settings.color"
                :clearable="settings.clearable"
                :disabled="settings.disabled"
                :readonly="settings.readonly">
                <template
                  v-if="settings.prepend"
                  #prepend>
                  <v-icon :icon="mdiRefresh" />
                </template>
                <template
                  v-if="settings.append"
                  #append>
                  <v-icon :icon="mdiRefresh" />
                </template>
              </field-icon>
              <field-file
                label="FieldFile"
                :hint="settings.hint"
                :variant="settings.variant"
                :color="settings.color"
                :clearable="settings.clearable"
                :disabled="settings.disabled"
                :readonly="settings.readonly"
                :multiple="settings.multiple">
                <template
                  v-if="settings.prepend"
                  #prepend>
                  <v-icon :icon="mdiRefresh" />
                </template>
                <template
                  v-if="settings.append"
                  #append>
                  <v-icon :icon="mdiRefresh" />
                </template>
              </field-file>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
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
import { CardSectionTitle, FieldChipGroup, FieldColorBullets, FieldDate, FieldFile, FieldIcon, FieldNumeric } from '@amilochau/core-vue3/components';
import { TestEnum } from '@/types/test';
import { type FormattedDataWithValue } from '@amilochau/core-vue3/types';
import { mdiFormTextbox, mdiListBox, mdiRefresh, mdiTree } from '@mdi/js';

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

const settings = ref<{
  form: {
    readonly?: boolean,
  },
  hint?: string,
  clearable?: boolean,
  variant?: 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled',
  color?: string,
  disabled?: boolean,
  readonly?: boolean,
  prepend?: boolean,
  append?: boolean,
  mandatory?: boolean,
  multiple?: boolean,
}>({
  form: {},
});

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
  options:
    default: default
    error: error
    warning: warning
    info: info
    withoutIcon: without icon
    withoutColor: without color
    masked: masked
    hidden: hidden
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
fr:
  options:
    default: default
    error: error
    warning: warning
    info: info
    withoutIcon: without icon
    withoutColor: without color
    masked: masked
    hidden: hidden
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
</i18n>
