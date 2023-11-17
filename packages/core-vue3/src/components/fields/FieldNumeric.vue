<template>
  <v-text-field
    v-model="internalValue"
    :label="label"
    :rules="[...rules ?? [], number()]"
    :disabled="disabled"
    :clearable="clearable"
    :suffix="suffix"
    type="text"
    inputmode="decimal"
    @update:model-value="parseInput">
    <template
      v-if="$slots.prepend"
      #prepend>
      <slot name="prepend" />
    </template>
    <template
      v-if="$slots.append"
      #append>
      <slot name="append" />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { VTextField } from 'vuetify/components';
import { useValidationRules } from '../../composition';
import { ref, watch } from 'vue';

defineProps<{
  /** Title used as the input label */
  label?: string
  /** Validation rules */
  rules?: any[]
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input is clearable */
  clearable?: boolean
  /** Text field suffix */
  suffix?: string
}>();

const modelValue = defineModel<number | undefined>();

const { number } = useValidationRules();

const internalValue = ref('');

const convertToNumber = (input: string) => Number(input.replace(',', '.'));

const parseInput = (input: string) => {
  if (!input) {
    modelValue.value = undefined;
    return;
  }
  const parsedInput = convertToNumber(input);
  if (!isNaN(parsedInput)) {
    modelValue.value = parsedInput;
  }
};

watch(modelValue, (newValue) => {
  if (newValue !== convertToNumber(internalValue.value)) {
    internalValue.value = newValue?.toString() || '';
  }
}, {
  immediate: true,
});
</script>
