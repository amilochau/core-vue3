<template>
  <v-navigation-drawer
    v-model="appStore.drawer"
    app
    temporary>
    <v-list
      :items="navigationOptions.items"
      color="primary"
      density="comfortable"
      item-props
      nav />
    <template
      v-if="navigationOptions.appendItems && navigationOptions.appendItems.length"
      #append>
      <v-divider />
      <v-list
        :items="navigationOptions.appendItems"
        color="primary"
        density="compact"
        :lines="false"
        item-props
        nav />
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useCoreOptions } from '../../../composition';
import { useAppStore } from '../../../stores'

var appStore = useAppStore()
const coreOptions = useCoreOptions()

const navigationOptions = coreOptions.application.navigation
</script>
