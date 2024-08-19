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
      <v-chip-group
        v-model="modelValue"
        :multiple="multiple"
        :mandatory="mandatory"
        selected-class="text-primary"
        column
        class="mt-3 pb-0">
        <v-slide-x-transition group>
          <v-chip
            v-for="value in displayedValues"
            :key="`${value.value}`"
            :value="value.value"
            :color="value.color"
            :disabled="itemReadonly || itemDisabled || value.disabled"
            filter
            @focus="focused = true"
            @blur="focused = false">
            <template
              v-if="value.icon"
              #prepend>
              <v-icon
                :icon="value.icon"
                :start="!!value.title"
                :color="value.color" />
            </template>
            {{ value.title }}
          </v-chip>
        </v-slide-x-transition>
      </v-chip-group>
    </v-field>
    <template
      v-if="clearable || useMasked || slots.append"
      #append>
      <v-icon
        v-if="useMasked"
        :icon="displayMasked ? mdiUnfoldLessHorizontal : mdiUnfoldMoreHorizontal"
        @click="displayMasked = !displayMasked" />
      <v-icon
        v-if="clearable"
        :icon="mdiClose"
        @click="reset" />
      <slot name="append" />
    </template>
  </v-input>
</template>

<script setup lang="ts" generic="TData, TDataValue extends TData | TData[]">
import { mdiClose, mdiUnfoldLessHorizontal, mdiUnfoldMoreHorizontal } from '@mdi/js';
import { computed, inject, ref } from 'vue';
import { type FormattedDataWithValue } from '../../types';

const props = defineProps<{
  /** Title used as the input label. */
  label?: string
  /** Values proposed to be selected. */
  values: FormattedDataWithValue<TData>[]
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
  /** Whether multiple values can be selected. */
  multiple?: boolean
  /** Whether at least one value must be selected. */
  mandatory?: boolean
}>();

const slots = defineSlots<{
  prepend?(): any,
  append?(): any,
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
const useMasked = computed(() => !Object.values(props.values).every((x) => !x.masked));
const displayMasked = ref(false);
const displayedValues = computed(() => props.values.filter((x) =>
  !x.hidden && (!x.masked || displayMasked.value)
  || x.value === modelValue.value
  || (modelValue.value !== null && modelValue.value !== undefined && Array.isArray(modelValue.value) && modelValue.value.includes(x.value))));
</script>
