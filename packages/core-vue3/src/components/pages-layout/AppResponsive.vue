<template>
  <v-container
    :class="{ 'fill-height': fillHeight }">
    <v-row
      v-if="title && !xs"
      :class="{ 'mx-n4': xs }"
      justify="center">
      <v-col
        cols="12"
        sm="9"
        md="8"
        lg="6"
        class="text-center">
        <h1 class="mt-4 text-h5 text-primary">
          {{ title }}
        </h1>
        <p
          v-if="description"
          class="mb-4">
          {{ description }}
        </p>
      </v-col>
    </v-row>
    <slot name="prepend" />
    <v-row
      :class="{ 'mx-n4': xs }"
      justify="center">
      <v-col
        cols="12"
        sm="9"
        md="8"
        lg="6">
        <slot />
      </v-col>
    </v-row>
    <v-row
      v-if="button"
      justify="center">
      <v-col
        cols="12"
        sm="9"
        md="8"
        lg="6"
        align="center">
        <v-btn-action
          :disabled="loading || !online || button.disabled"
          :loading="loading"
          :prepend-icon="button.icon"
          :href="button.href"
          target="_blank"
          rel="noopener noreferrer"
          :color="button.color"
          @click="button.onClick">
          {{ button.title }}
        </v-btn-action>
      </v-col>
    </v-row>
    <slot name="append" />
    <v-row
      v-if="links && links.length"
      :class="{ 'mx-n4': xs }"
      justify="center">
      <v-col
        cols="12"
        sm="9"
        md="8"
        lg="6">
        <app-links
          :links="links" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core';
import AppLinks from './AppLinks.vue';
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores';

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
    onClick?: () => Promise<void>,
    href?: string,
    disabled?: boolean,
  },
}>();

defineSlots<{
  default(): any,
  prepend?(): any,
  append?(): any,
}>();

const { xs } = useDisplay();
const online = useOnline();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
</script>
