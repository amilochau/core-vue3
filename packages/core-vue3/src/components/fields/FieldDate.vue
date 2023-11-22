<template>
  <v-text-field
    :model-value="displayedValue"
    :label="label"
    :rules="rules"
    :disabled="disabled"
    :color="color"
    :variant="variant"
    type="text"
    class="cursor-pointer"
    readonly
    @click:control="displayDialog = !displayDialog">
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
  <v-dialog
    v-model="displayDialog"
    width="auto">
    <v-card>
      <v-date-picker
        :model-value="internalValue"
        :disabled="disabled"
        :color="color ?? 'primary'"
        show-adjacent-months
        @update:model-value="save" />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js';
import { type Ref, computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDate } from 'vuetify';

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
  /** Input variant */
  variant?: 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'
}>();

const modelValue = defineModel<string | undefined>();

const { d, mergeDateTimeFormat } = useI18n();
const date = useDate();

mergeDateTimeFormat('en', {
  datetime: {
    year: 'numeric', month: 'numeric', day: 'numeric',
  },
});
mergeDateTimeFormat('fr', {
  datetime: {
    year: 'numeric', month: 'numeric', day: 'numeric',
  },
});

const displayDialog = ref(false);
const internalValue: Ref<any> = ref(undefined);
const displayedValue = computed(() => internalValue.value ? d(internalValue.value, 'datetime') : '');

function reset() {
  modelValue.value = undefined;
  internalValue.value = undefined;
  displayDialog.value = false;
}

function save(value: any) {
  internalValue.value = value;
  modelValue.value = date.toISO(value);
  displayDialog.value = false;
}

watch(modelValue, () => {
  internalValue.value = modelValue.value ? date.parseISO(modelValue.value) : undefined;
}, { immediate: true });
</script>
