<template>
  <v-navigation-drawer
    v-if="items"
    v-model="appStore.drawer"
    app
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
import { useAppOptions } from '../../../composition';
import { useAppStore } from '../../../stores';

const appStore = useAppStore();
const { coreOptions } = useAppOptions();

const { items, appendItems } = coreOptions.application.navigation();
</script>
