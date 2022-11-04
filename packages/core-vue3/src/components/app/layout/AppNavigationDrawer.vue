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
import { useI18n } from 'vue-i18n';
import { useCoreOptions } from '../../../composition';
import { useAppStore } from '../../../stores'

const { t } = useI18n()
var appStore = useAppStore()
const coreOptions = useCoreOptions()

const menuItems = coreOptions.application.navigation
</script>
