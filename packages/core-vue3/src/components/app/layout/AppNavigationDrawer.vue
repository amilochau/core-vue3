<template>
  <v-navigation-drawer
    v-if="items"
    v-model="appStore.drawer"
    absolute
    temporary
    touchless>
    <v-list
      :items="items"
      color="primary"
      density="comfortable"
      item-props
      nav />
    <template
      v-if="appendItems && appendItems.length"
      #append>
      <v-divider />
      <v-list
        :items="appendItems"
        color="primary"
        density="compact"
        :lines="false"
        item-props
        nav />
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '../../../stores';

defineProps<{
  /** Main navigation items. */
  items: any[],
  /** Navigation items appended at the bottom of the drawer. */
  appendItems?: any[],
}>();

const appStore = useAppStore();
</script>
