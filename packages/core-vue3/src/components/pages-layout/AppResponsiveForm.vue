<template>
  <app-responsive
    :title="title"
    :description="description"
    :links="links"
    :fill-height="fillHeight">
    <template #prepend>
      <slot name="prepend" />
    </template>
    <template #append>
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
import { ref, type Ref } from 'vue';

defineProps<{
  title?: string,
  description?: string,
  button?: {
    title: string,
    icon: string,
    color: 'primary' | 'success' | 'warning' | 'error',
    onClick: () => Promise<void>,
    disabled?: boolean,
  },
  links?: any[],
  fillHeight?: boolean,
}>()

const form: Ref<any> = ref(null)

defineExpose({
  reset: () => form.value!.reset(),
  resetValidation: () => form.value!.resetValidation(),
  validate: () => form.value!.validate(),
})
</script>
