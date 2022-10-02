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
import { mdiGavel, mdiHome, mdiMap } from '@mdi/js'
import { useAppStore, useMapsStore } from '../../../stores';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
var appStore = useAppStore()
var mapsStore = useMapsStore()

const mapsMenuItems = [
  { type: 'divider' },
  { type: 'subheader', title: t('app.navigation.lastMaps') },
  ...mapsStore.lastItems.map((x) => ({
    title: x.name,
    prependIcon: mdiMap,
    to: { name: 'Map', params: { id: x.id } }
  }))
]

const menuItems = [
  { title: t('app.navigation.home'), prependIcon: mdiHome, to: { name: 'Home' } },
  { type: 'divider' },
  { title: t('app.navigation.privacy'), prependIcon: mdiGavel, to: { name: 'Privacy' } },
  ...mapsStore.lastItems.length ? mapsMenuItems : []
]
</script>
