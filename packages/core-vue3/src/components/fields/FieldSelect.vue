<template>
  <v-select
    :model-value="modelValue"
    :label="labelTitle"
    :rules="rules"
    :items="items"
    variant="underlined"
    density="comfortable"
    hide-details="auto"
    class="mb-3"
    @update:model-value="emits('update:modelValue', parseInt($event))">
    <template #item="templateProps">
      <v-list-item v-bind="templateProps.props">
        <template #title>
          <v-icon
            :icon="format(templateProps.item.value).icon"
            :color="format(templateProps.item.value).color"
            start />
          {{ format(templateProps.item.value).title }}
        </template>
      </v-list-item>
    </template>
    <template #selection="templateProps">
      <v-icon
        :icon="format(templateProps.item.value).icon"
        :color="format(templateProps.item.value).color"
        start />
      {{ format(templateProps.item.value).title }}
    </template>
  </v-select>
</template>

<script setup lang="ts">
import type { FormattedData } from '../../types';

defineProps<{
  modelValue?: number,
  labelTitle: string,
  rules?: any[],
  items: FormattedData<any>[],
  format: (value: any) => FormattedData<any>,
}>()

const emits = defineEmits<{
  (eventName: 'update:modelValue', value?: number): void
}>()
</script>
