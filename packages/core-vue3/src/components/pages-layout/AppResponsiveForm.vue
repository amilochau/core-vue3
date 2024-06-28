<template>
  <app-responsive
    :title="title"
    :description="description"
    :links="links"
    :fill-height="fillHeight">
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
    <app-form
      ref="form"
      :button="button">
      <slot />
    </app-form>
  </app-responsive>
</template>

<script setup lang="ts">
import AppForm from './AppForm.vue';
import AppResponsive from './AppResponsive.vue';
import { ref } from 'vue';
import { VForm } from 'vuetify/components';

defineProps<{
  /** Title. */
  title?: string,
  /** Description, displayed as subtitle. */
  description?: string,
  /** Links for external pages. */
  links?: any[],
  /** Whether the component should fill the page height. */
  fillHeight?: boolean,
  /** Form button. */
  button?: {
    title: string,
    icon: string,
    color: 'primary' | 'success' | 'warning' | 'error',
    onClick: () => Promise<void>,
    disabled?: boolean,
  },
}>();

const slots = defineSlots<{
  default(): any,
  prepend?(): any,
  append?(): any,
}>();

const form = ref<InstanceType<typeof VForm>>();

defineExpose({
  reset: () => form.value?.reset(),
  resetValidation: () => form.value?.resetValidation(),
  validate: () => form.value?.validate(),
});
</script>
