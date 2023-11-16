<template>
  <v-form
    ref="form"
    :readonly="loading">
    <v-card
      :class="{ 'bg-transparent': xs }"
      flat>
      <slot />
      <v-card-text
        v-if="button"
        class="text-center">
        <v-btn-action
          :disabled="loading || !online || button.disabled"
          :loading="loading"
          :prepend-icon="button.icon"
          :color="button.color"
          @click="onButtonClick">
          {{ button.title }}
        </v-btn-action>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores';
import { useDisplay } from 'vuetify';
import { type Ref, ref } from 'vue';
import { useOnline } from '@vueuse/core';
import { useHandle } from '../../composition';
import { VForm } from 'vuetify/components';

const props = defineProps<{
  /** Form button */
  button?: {
    title: string,
    icon: string,
    color: 'primary' | 'success' | 'warning' | 'error',
    onClick: () => Promise<void>,
    disabled?: boolean,
  },
}>();

const appStore = useAppStore();
const online = useOnline();
const { xs } = useDisplay();
const { handleFormValidation } = useHandle();
const { loading } = storeToRefs(appStore);

const form = ref<InstanceType<typeof VForm>>();

const onButtonClick = async () => {
  if (!props.button) {
    return;
  }

  if (!await handleFormValidation(form)) {
    return;
  }

  await props.button.onClick();
};

defineExpose({
  reset: () => form.value?.reset(),
  resetValidation: () => form.value?.resetValidation(),
  validate: () => form.value?.validate(),
});
</script>
