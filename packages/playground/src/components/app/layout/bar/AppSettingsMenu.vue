<template>
  <v-menu
    :close-on-content-click="false"
    location="bottom end">
    <template #activator="{ props: menu }">
      <v-tooltip location="start">
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="mergeProps(menu, tooltip)"
            :icon="mdiCog" />
        </template>
        <span>{{ t('app.header.settings.title') }}</span>
      </v-tooltip>
    </template>
    <v-card min-width="240px">
      <v-list
        density="comfortable"
        item-props
        nav>
        <v-list-subheader :title="t('app.header.settings.languages.title')" />
        <v-list-item
          v-for="(item, i) in languageItems"
          :key="i"
          :title="item.title"
          :prepend-avatar="item.prependAvatar"
          @click="item.onClick" />
        <v-divider />
        <v-list-subheader :title="t('app.header.settings.display.title')" />
        <v-list-item
          :title="t('app.header.settings.display.darkMode')"
          @click="themeStore.darkMode = !themeStore.darkMode">
          <template #prepend>
            <v-list-item-action start>
              <v-checkbox-btn :model-value="themeStore.darkMode" />
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { mdiCog } from '@mdi/js'
import { mergeProps } from 'vue'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@amilochau/core-vue3';

const { t } = useI18n()
const router = useRouter()
const themeStore = useThemeStore()

const languageItems = [
  { title: t('app.header.settings.languages.english'), onClick: () => onClick('en'), prependAvatar: '/img/us/24.png', lang: 'en' },
  { title: t('app.header.settings.languages.french'), onClick: () => onClick('fr'), prependAvatar: '/img/fr/24.png', lang: 'fr' }
]

function onClick(lang: string) {
  router.replace({ params: { lang }})
}
</script>
