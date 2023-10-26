<template>
  <v-autocomplete
    v-model="modelValue"
    :label="labelTitle"
    :rules="rules"
    :items="items"
    variant="underlined"
    density="comfortable"
    hide-details="auto"
    type="text"
    class="mb-3"
    :multiple="multiple"
    :clearable="clearable">
    <template #item="templateProps">
      <v-list-item
        v-if="!templateProps.item.raw.hidden"
        v-bind="templateProps.props"
        :title="templateProps.item.title"
        :subtitle="templateProps.item.raw.subtitle"
        :disabled="templateProps.item.raw.disabled">
        <template
          v-if="templateProps.item.raw.icon || multiple"
          #prepend="{ isSelected }">
          <v-checkbox-btn
            v-if="multiple"
            :model-value="isSelected"
            :ripple="false" />
          <v-icon
            v-if="templateProps.item.raw.icon"
            :icon="templateProps.item.raw.icon"
            :color="templateProps.item.raw.color"
            class="mr-3" />
        </template>
      </v-list-item>
    </template>
    <template #selection="templateProps">
      <v-icon
        v-if="templateProps.item.raw.icon"
        :icon="templateProps.item.raw.icon"
        :color="templateProps.item.raw.color"
        start />
      <span class="mr-2">
        {{ templateProps.item.title }}
      </span>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import type { FormattedData } from '../../types';

const modelValue = defineModel<number | string | string[]>()

defineProps<{
  labelTitle: string,
  rules?: any[],
  items: FormattedData<any>[],
  multiple?: boolean,
  clearable?: boolean,
}>()
</script>
