<template>
  <v-text-field
    v-model="internalValue"
    :label="label"
    :rules="[...rules ?? [], number()]"
    :disabled="disabled"
    :suffix="suffix"
    :color="color"
    :variant="variant"
    type="text"
    inputmode="decimal"
    @update:model-value="parseInput">
    <template
      v-if="$slots.prepend"
      #prepend>
      <slot name="prepend" />
    </template>
    <template
      v-if="clearable || $slots.append"
      #append>
      <v-icon
        v-if="clearable"
        :icon="mdiClose"
        @click="reset" />
      <slot name="append" />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js';
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
  /** Input color */
  color?: string
  /** Text field suffix */
  suffix?: string
  /** Input variant */
  variant?: 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'
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

function reset() {
  modelValue.value = undefined;
  internalValue.value = '';
}

watch(modelValue, (newValue) => {
  if (newValue !== convertToNumber(internalValue.value)) {
    internalValue.value = newValue?.toString() || '';
  }
}, {
  immediate: true,
});
</script>
