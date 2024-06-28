<template>
  <v-text-field
    :model-value="displayedValue"
    :label="label"
    :rules="rules"
    :disabled="itemDisabled"
    :color="color"
    :variant="variant"
    type="text"
    class="cursor-pointer"
    readonly
    @click:control="open">
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
    <v-dialog
      v-model="displayDialog"
      width="auto">
      <v-card>
        <v-date-picker
          :model-value="internalValue"
          :disabled="itemDisabled"
          :color="color ?? 'primary'"
          show-adjacent-months
          @update:model-value="save" />
      </v-card>
      <div class="my-2 text-center">
        <v-btn-action
          :text="t('yesterday')"
          class="mx-1"
          color="primary"
          variant="elevated"
          size="small"
          @click="setDate(-1)" />
        <v-btn-action
          :text="t('today')"
          :prepend-icon="mdiCalendarToday"
          class="mx-1"
          color="primary"
          variant="elevated"
          size="small"
          @click="setDate(0)" />
      </div>
    </v-dialog>
  </v-text-field>
</template>

<script setup lang="ts">
import { mdiCalendarToday, mdiClose } from '@mdi/js';
import { type Ref, computed, inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDate } from 'vuetify';

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
  /** Input variant. */
  variant?: 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'
}>();

const slots = defineSlots<{
  prepend?(): any,
  append?(): any,
}>();

const modelValue = defineModel<string | undefined>();

const { d, t } = useI18n();
const date = useDate();

const displayDialog = ref(false);
const internalValue: Ref<any> = ref(undefined);
const displayedValue = computed(() => internalValue.value ? d(internalValue.value, { year: 'numeric', month: 'numeric', day: 'numeric' }) : '');

const setDate = (daysOffset: number) => {
  const dateToSet = date.addDays(new Date(), daysOffset);
  save(dateToSet);
};

const open = () => {
  if (itemDisabled.value || itemReadonly.value) {
    return;
  }
  displayDialog.value = true;
};

const reset = () => {
  if (itemDisabled.value || itemReadonly.value) {
    return;
  }
  modelValue.value = undefined;
  internalValue.value = undefined;
  displayDialog.value = false;
};

const save = (value: any) => {
  displayDialog.value = false;
  internalValue.value = value;
  modelValue.value = date.toISO(value);
};

watch(modelValue, () => {
  internalValue.value = modelValue.value ? date.parseISO(modelValue.value) : undefined;
}, { immediate: true });

// Vuetify only uses 'disabled' and 'readonly' from 'v-form' if no value is defined... In contradiction with vue.js standards
const vuetifyForm: any = inject(Symbol.for('vuetify:form'), null);
const itemDisabled = computed(() => props.disabled || !!vuetifyForm?.isDisabled.value);
const itemReadonly = computed(() => props.readonly || !!vuetifyForm?.isReadonly.value);
</script>

<i18n lang="yaml">
en:
  yesterday: Yesterday
  today: Today
fr:
  yesterday: Hier
  today: Aujourd'hui
</i18n>
