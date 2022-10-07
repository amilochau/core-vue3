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
import { mdiGavel, mdiHome } from '@mdi/js'
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../../../stores'

const { t } = useI18n()
var appStore = useAppStore()

const menuItems = [
  { title: t('app.navigation.home'), prependIcon: mdiHome, to: { name: 'Home' } },
  { type: 'divider' },
  { title: t('app.navigation.privacy'), prependIcon: mdiGavel, to: { name: 'Privacy' } },
]
</script>
