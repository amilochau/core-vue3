<template>
  <v-file-input
    v-model="modelValue"
    :label="label"
    :rules="rules"
    :disabled="itemDisabled"
    :suffix="suffix"
    :color="color"
    :variant="variant"
    :readonly="itemReadonly"
    :accept="accept"
    :multiple="multiple"
    type="file">
    <template
      v-if="slots.prepend"
      #prepend>
      <slot name="prepend" />
    </template>
    <template
      v-if="clearable || slots.append"
      #append>
      <v-icon
        v-if="clearable"
        :icon="mdiClose"
        @click="reset" />
      <slot name="append" />
    </template>
    <template #selection="{ fileNames }">
      <v-chip
        v-for="fileName in fileNames"
        :key="fileName"
        :prepend-icon="mdiFileOutline"
        class="me-1"
        size="small">
        {{ fileName }}
      </v-chip>
    </template>
  </v-file-input>
</template>

<script setup lang="ts">
import { mdiClose, mdiFileOutline } from '@mdi/js';
import { computed, inject } from 'vue';

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
  /** File types (as extensions) to accept. */
  accept?: string
  /** Whether multiple files can be selected. */
  multiple?: boolean
}>();

const slots = defineSlots<{
  prepend?(): any,
  append?(): any,
}>();

const modelValue = defineModel<File | File[] | undefined>();

const reset = () => {
  if (itemDisabled.value || itemReadonly.value) {
    return;
  }
  modelValue.value = undefined;
};

// Vuetify only uses 'disabled' and 'readonly' from 'v-form' if no value is defined... In contradiction with vue.js standards
const vuetifyForm: any = inject(Symbol.for('vuetify:form'), null);
const itemDisabled = computed(() => props.disabled || vuetifyForm?.isDisabled.value);
const itemReadonly = computed(() => props.readonly || vuetifyForm?.isReadonly.value);
</script>
