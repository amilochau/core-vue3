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
          <v-btn
            :disabled="loading || !online"
            :loading="loading"
            :prepend-icon="button.icon"
            :color="button.color"
            variant="tonal"
            rounded
            @click="onButtonClick">
            {{ button.title }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </app-responsive>
</template>

<script setup lang="ts">
import AppResponsive from './AppResponsive.vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores';
import { useDisplay } from 'vuetify';
import { ref, type Ref } from 'vue';
import { useOnline } from '@vueuse/core';
import { useHandle } from '../../composition';

const props = defineProps<{
  title?: string,
  description?: string,
  button?: {
    title: string,
    icon: string,
    color: 'primary' | 'warning' | 'error',
    onClick: () => Promise<void>,
  },
  links?: any[],
  fillHeight?: boolean,
}>()

const appStore = useAppStore()
const online = useOnline()
const { xs } = useDisplay()
const { handleFormValidation } = useHandle()
const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)

const onButtonClick = async () => {
  if (!props.button) {
    return
  }

  if (!await handleFormValidation(form)) {
    return
  }

  await props.button.onClick()
}
</script>
