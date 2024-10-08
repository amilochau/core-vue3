<template>
  <v-text-field
    v-model="internalValue"
    :label="label"
    :rules="[...rules ?? [], number()]"
    :disabled="itemDisabled"
    :suffix="suffix"
    :color="color"
    :variant="variant"
    :readonly="itemReadonly"
    :clearable="clearable"
    type="text"
    inputmode="decimal"
    @update:model-value="parseInput">
    <template
      v-if="slots.prepend"
      #prepend>
      <slot name="prepend" />
    </template>
    <template
      v-if="slots.append"
      #append>
      <slot name="append" />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { VTextField } from 'vuetify/components';
import { useValidationRules } from '../../composition';
import { computed, inject, ref, watch } from 'vue';

const props = defineProps<{
  /** Title used as the input label. */
  label?: string
  /** Validation rules. */
  rules?: any[]
  /** Whether the input is disabled. */
  disabled?: boolean
  /** Whether the input is clearable. */
  clearable?: boolean
  /** Input color. */
  color?: string
  /** Whether the input is readonly. */
  readonly?: boolean
  /** Text field suffix. */
  suffix?: string
  /** Input variant. */
  variant?: 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'
}>();

const slots = defineSlots<{
  prepend?(): any,
  append?(): any,
}>();

const modelValue = defineModel<number | undefined>();

const { number } = useValidationRules();

const internalValue = ref<string | undefined | null>('');

const convertToNumber = (input: string) => Number(input.replace(',', '.'));

const parseInput = (input: string | undefined) => {
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
  const internalValueConverted = internalValue.value ? convertToNumber(internalValue.value) : internalValue.value;
  if (newValue !== internalValueConverted) {
    internalValue.value = newValue?.toString() || '';
  }
}, {
  immediate: true,
});

// Vuetify only uses 'disabled' and 'readonly' from 'v-form' if no value is defined... In contradiction with vue.js standards
const vuetifyForm: any = inject(Symbol.for('vuetify:form'), null);
const itemDisabled = computed(() => props.disabled || vuetifyForm?.isDisabled.value);
const itemReadonly = computed(() => props.readonly || vuetifyForm?.isReadonly.value);
</script>
