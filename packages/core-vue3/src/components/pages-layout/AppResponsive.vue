<template>
  <v-container
    :class="{ 'py-1': xs, 'fill-height': fillHeight }">
    <v-row
      v-if="title && !xs"
      :class="{ 'nx-n4': xs }"
      justify="center">
      <v-col
        cols="12"
        sm="6"
        class="text-center">
        <h1 class="mt-4 text-h5 text-primary">
          {{ title }}
        </h1>
      </v-col>
    </v-row>
    <v-row
      :class="{ 'nx-n4': xs }"
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
      v-if="links && links.length"
      :class="{ 'nx-n4': xs }"
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
import AppLinks from './AppLinks.vue';
import { useDisplay } from 'vuetify';

defineProps<{
  title?: string,
  links?: any[],
  fillHeight?: boolean,
}>()

const { xs } = useDisplay()
</script>
