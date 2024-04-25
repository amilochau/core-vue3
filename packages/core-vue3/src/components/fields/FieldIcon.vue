<template>
  <v-input
    v-model:model-value="modelValue"
    :focused="focused"
    :rules="rules"
    :disabled="itemDisabled"
    :readonly="itemReadonly"
    class="mb-3">
    <template
      v-if="slots.prepend"
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
      <div class="icons-grid">
        <v-avatar
          v-for="(icon, i) in icons"
          :key="i"
          :color="icon.value === modelValue ? icon.color : undefined"
          class="icons-grid-cell"
          :class="{ 'icons-grid-cell__selected': icon.value === modelValue }">
          <v-icon
            :icon="icon.icon"
            :color="icon.value === modelValue ? undefined : icon.color"
            tabindex="0"
            @focus="focused = true"
            @blur="focused = false"
            @click="setModelValue(icon.value)" />
        </v-avatar>
      </div>
    </v-field>
    <template
      v-if="clearable || slots.append"
      #append>
      <v-icon
        v-if="clearable"
        :icon="mdiClose"
        @click="reset" />
      <slot name="append" />
    </template>
  </v-input>
</template>

<script setup lang="ts" generic="TData">
import { mdiClose } from '@mdi/js';
import { computed, inject, ref } from 'vue';
import { type FormattedDataWithValue } from '../../types';

const props = defineProps<{
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
  /** Whether the input is readonly */
  readonly?: boolean
  /** Icons used as values */
  icons: FormattedDataWithValue<TData>[]
}>();

const slots = defineSlots<{
  prepend?(): any,
  append?(): any,
}>();

const modelValue = defineModel<TData | undefined>();

const focused = ref(false);

const setModelValue = (value: TData) => {
  if (itemDisabled.value || itemReadonly.value) {
    return;
  }
  modelValue.value = value;
};

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

<style>
.icons-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  width: 100%;
  padding-top: 18px;
}
.icons-grid-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px !important;
  width: 28px !important;
  margin: -2px !important;
  cursor: pointer;
  border-radius: 50%;
  transition-property: none;
}
.icons-grid-cell:hover {
  border: 1px solid #515151;
  border-width: 2px !important;
}
.icons-grid-cell__selected {
  height: 32px !important;
  width: 32px !important;
  margin: -4px !important;
  border: 1px solid #515151;
  z-index: 1;
}
.icons-grid-cell__selected:hover {
  border-width: 2px !important;
}
</style>
