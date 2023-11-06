<template>
  <v-input
    v-model:model-value="modelValue"
    :focused="focused"
    :rules="rules"
    density="comfortable"
    hide-details="auto"
    class="mb-1">
    <v-field
      :label="labelTitle"
      :focused="focused"
      variant="plain"
      active>
      <v-chip-group
        v-model="modelValue"
        :multiple="multiple"
        selected-class="text-primary"
        class="mt-3">
        <v-chip
          v-for="(value, i) in values"
          :key="i"
          :value="value.value"
          :color="value.color"
          :prepend-icon="value.icon"
          :disabled="value.disabled">
          {{ value.title }}
        </v-chip>
      </v-chip-group>
    </v-field>
  </v-input>
</template>

<script setup lang="ts" generic="TData, TDataValue extends TData | TData[]">
import { ref } from 'vue';
import { type FormattedData } from '../../types';

const modelValue = defineModel<TDataValue | undefined>()

defineProps<{
  labelTitle: string
  values: FormattedData<TData>[]
  rules?: any[]
  multiple?: boolean
}>()

const focused = ref(false)
</script>
