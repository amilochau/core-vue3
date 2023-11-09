<template>
  <v-input
    v-model:model-value="modelValue"
    :focused="focused"
    :rules="rules"
    class="mb-1">
    <v-field
      :label="label"
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
import { type FormattedDataWithValue } from '../../types';

defineProps<{
  /** Title used as the input label */
  label: string
  /** Values proposed to be selected */
  values: FormattedDataWithValue<TData>[]
  /** Validation rules */
  rules?: any[]
  /** Whether multiple values can be selected */
  multiple?: boolean
}>()

const modelValue = defineModel<TDataValue | undefined>()

const focused = ref(false)
</script>
