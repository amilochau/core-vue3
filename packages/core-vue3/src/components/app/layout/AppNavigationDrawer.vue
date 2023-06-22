<template>
  <v-navigation-drawer
    v-model="appStore.drawer"
    app
    temporary
    nav>
    <v-list
      :items="menuItems"
      density="comfortable"
      item-props
      nav />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useCoreOptions } from '../../../composition';
import { useAppStore } from '../../../stores'

var appStore = useAppStore()
const coreOptions = useCoreOptions()

const menuItems = coreOptions.application.navigation.items
</script>
