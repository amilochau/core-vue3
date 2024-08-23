<template>
  <v-input
    v-model:model-value="modelValue"
    :focused="focused"
    :rules="[ ...rules ?? [], minValue(min), maxValue(max) ]"
    :disabled="itemDisabled"
    :readonly="itemReadonly"
    class="mb-n2">
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
      <v-slider
        v-model:focused="focused"
        v-model="modelValue"
        :disabled="itemDisabled"
        :readonly="itemReadonly"
        :min="min"
        :max="max"
        :step="step"
        :thumb-size="modelValue ? undefined : 0"
        class="py-2"
        hide-details />
    </v-field>
    <template #append>
      <v-fade-transition v-if="clearable">
        <v-icon
          :icon="dirty ? mdiCloseCircle : undefined"
          class="mr-1"
          @click="reset" />
      </v-fade-transition>
      <v-avatar
        size="x-small"
        class="mr-1">
        {{ modelValue }}
      </v-avatar>
      <slot name="append" />
    </template>
  </v-input>
</template>

<script setup lang="ts">
import { mdiCloseCircle } from '@mdi/js';
import { useValidationRules } from '@amilochau/core-vue3/composition';
import { computed, inject, ref } from 'vue';

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
  /** Minimum value of the slider. */
  min: number,
  /** Maximum value of the slider. */
  max: number,
  /** Step value of the slider. */
  step: number,
}>();

const slots = defineSlots<{
  prepend?(): any,
  append?(): any,
}>();

const modelValue = defineModel<number| undefined>();

const focused = ref(false);
const dirty = computed(() => modelValue.value !== undefined && modelValue.value !== null);

const { minValue, maxValue } = useValidationRules();

// Vuetify only uses 'disabled' and 'readonly' from 'v-form' if no value is defined... In contradiction with vue.js standards
const vuetifyForm: any = inject(Symbol.for('vuetify:form'), null);
const itemDisabled = computed(() => props.disabled || !!vuetifyForm?.isDisabled.value);
const itemReadonly = computed(() => props.readonly || !!vuetifyForm?.isReadonly.value);

const reset = () => {
  if (itemDisabled.value || itemReadonly.value) {
    return;
  }
  modelValue.value = undefined;
};
</script>
