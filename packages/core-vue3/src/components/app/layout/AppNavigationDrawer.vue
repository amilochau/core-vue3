<template>
  <v-navigation-drawer
    v-if="items"
    v-model="appStore.drawer"
    app
    temporary>
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
import { computed } from 'vue';
import { useCoreOptions } from '../../../composition';
import { useAppStore } from '../../../stores';

const appStore = useAppStore();
const coreOptions = useCoreOptions();

const { items, appendItems } = coreOptions.application.navigation();
</script>
