<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('longText') }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <p>{{ t('longText') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-list>
          <v-list-item
            :title="t('longText')"
            :subtitle="t('longText')" />
        </v-list>
      </v-col>
      <v-col cols="6">
        <v-switch
          v-model="boolValue"
          :label="t('text1')" />
        <v-switch
          v-model="boolValue"
          :label="t('text2')"
          color="warning" />
      </v-col>
      <v-col cols="6">
        <v-text-field
          :label="t('text1')" />
        <v-text-field
          :label="t('text2')"
          variant="outlined" />
      </v-col>
      <v-col cols="6">
        <v-textarea
          :label="t('text1')" />
        <v-textarea
          :label="t('text2')" />
      </v-col>
      <v-col cols="6">
        <v-timeline>
          <v-timeline-item>
            {{ t('text1') }}
          </v-timeline-item>
          <v-timeline-item>
            {{ t('text2') }}
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-col cols="6">
        <v-btn>
          {{ t('text1') }}
        </v-btn>
        <v-btn-action>
          {{ t('text2') }}
        </v-btn-action>
      </v-col>
      <v-col cols="6">
        <field-chip-group
          v-model="selectedValue"
          :label="t('text1')"
          :values="values" />
        <field-chip-group
          v-model="selectedValue"
          :label="t('text1')"
          :values="values"
          disabled />
        <field-color-bullets
          :label="t('text1')"
          :colors="colors" />
        <field-color-bullets
          :label="t('text1')"
          :colors="colors"
          disabled />
        <field-icon
          :label="t('text1')"
          :icons="icons" />
        <field-icon
          :label="t('text1')"
          :icons="icons"
          disabled />
        <field-date
          :label="t('text1')">
          <template #prepend>
            <v-icon :icon="mdiRefresh" />
          </template>
        </field-date>
        <field-date
          :label="t('text1')"
          disabled />
        <field-numeric
          v-model="numericValue"
          :label="t('text1')" />
      </v-col>
      <v-col cols="6">
        <field-numeric
          v-model="numericValue"
          :label="t('text1')"
          :rules="[required(), integer()]" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { type ComputedRef, computed, ref } from 'vue';
import { usePage, useValidationRules } from '@amilochau/core-vue3/composition';
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
const { required, integer } = useValidationRules();

const boolValue = ref(true);
const numericValue = ref(1);

const values: ComputedRef<FormattedDataWithValue<TestEnum>[]> = computed(() => [
  { value: TestEnum.First, title: t('text1') },
  { value: TestEnum.Second, title: t('text2') },
]);
const selectedValue = ref<TestEnum>(TestEnum.First);

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
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
fr:
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
</i18n>
