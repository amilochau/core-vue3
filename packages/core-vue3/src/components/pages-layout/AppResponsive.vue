<template>
  <v-container
    :class="{ 'px-0': xs }">
    <v-row
      v-if="!xs"
      justify="center">
      <v-col
        cols="12"
        sm="6"
        class="text-center">
        <h1 class="my-4 text-h5 text-primary">
          {{ title }}
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="9"
        md="8"
        lg="6">
        <slot />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="9"
        md="8"
        lg="6">
        <app-links
          v-if="links && links.length"
          :links="links" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import AppLinks from './AppLinks.vue';
import { useDisplay } from 'vuetify';

defineProps<{
  title: string,
  links?: any[],
}>()

const { xs } = useDisplay()
</script>
