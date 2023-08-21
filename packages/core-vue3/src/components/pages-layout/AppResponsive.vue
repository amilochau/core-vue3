<template>
  <div :class="{ 'fill-height': fillHeight }">
    <app-header-bar
      v-if="header"
      v-bind="header" />
    <v-container
      :class="{ 'px-0 py-1': xs, 'fill-height': fillHeight }">
      <v-row
        v-if="title && !xs"
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
      <v-row justify="center">
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
    <app-footer-bar
      v-if="footer"
      v-bind="footer" />
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import AppFooterBar from '../app/layout/bar/AppFooterBar.vue';
import AppHeaderBar from '../app/layout/bar/AppHeaderBar.vue';
import AppLinks from './AppLinks.vue';
import { useDisplay } from 'vuetify';

defineProps<{
  title?: string,
  links?: any[],
  header?: {
    contentMode?: 'title' | 'img'
    title?: string
    contentTo?: RouteLocationRaw
    buttonMode?: 'drawer' | 'back' | 'default-back'
    backTo?: RouteLocationRaw
    defaultBackTo?: RouteLocationRaw
  },
  footer?: {
    items?: {
      link: string,
      title: string,
    }[]
  },
  fillHeight?: boolean,
}>()

const { xs } = useDisplay()
</script>
