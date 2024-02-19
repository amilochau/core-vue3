<template>
  <v-input
    v-model:model-value="modelValue"
    :focused="focused"
    :rules="rules"
    :disabled="itemDisabled"
    :readonly="itemReadonly"
    class="mb-1">
    <template
      v-if="$slots.prepend"
      #prepend>
      <slot name="prepend" />
    </template>
    <v-field
      :label="label"
      :focused="focused"
      :disabled="itemDisabled"
      :color="color"
      variant="plain"
      active>
      <v-chip-group
        v-model="modelValue"
        :multiple="multiple"
        :mandatory="mandatory"
        selected-class="text-primary"
        column
        class="mt-3">
        <v-chip
          v-for="(value, i) in values"
          :key="i"
          :value="value.value"
          :color="value.color"
          :prepend-icon="value.icon"
          :disabled="itemReadonly || itemDisabled || value.disabled"
          @focus="focused = true"
          @blur="focused = false">
          {{ value.title }}
        </v-chip>
      </v-chip-group>
    </v-field>
    <template
      v-if="clearable || $slots.append"
      #append>
      <v-icon
        v-if="clearable"
        :icon="mdiClose"
        @click="reset" />
      <slot name="append" />
    </template>
  </v-input>
</template>

<script setup lang="ts" generic="TData, TDataValue extends TData | TData[]">
import { mdiClose } from '@mdi/js';
import { computed, inject, ref } from 'vue';
import { type FormattedDataWithValue } from '../../types';

const props = defineProps<{
  /** Title used as the input label */
  label?: string
  /** Values proposed to be selected */
  values: FormattedDataWithValue<TData>[]
  /** Validation rules */
  rules?: any[]
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input is clearable */
  clearable?: boolean
  /** Input color */
  color?: string
  /** Whether the input is readonly */
  readonly?: boolean
  /** Whether multiple values can be selected */
  multiple?: boolean
  /** Whether at least one value must be selected */
  mandatory?: boolean
}>();

const modelValue = defineModel<TDataValue | undefined>();

const focused = ref(false);

const reset = () => {
  if (itemDisabled.value || itemReadonly.value) {
    return;
  }
  modelValue.value = undefined;
};

// Vuetify only uses 'disabled' and 'readonly' from 'v-form' if no value is defined... In contradiction with vue.js standards
const vuetifyForm: any = inject(Symbol.for('vuetify:form'), null);
const itemDisabled = computed(() => props.disabled || !!vuetifyForm?.isDisabled.value);
const itemReadonly = computed(() => props.readonly || !!vuetifyForm?.isReadonly.value);
</script>
