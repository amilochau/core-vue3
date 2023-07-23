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
        <span>{{ t('title') }}</span>
      </v-tooltip>
    </template>
    <v-card min-width="240px">
      <v-list
        density="comfortable"
        item-props
        nav>
        <v-list-subheader :title="t('languages.title')" />
        <v-list-item
          v-for="(item, i) in languageItems"
          :key="i"
          :title="item.title"
          :prepend-avatar="item.prependAvatar"
          :active="language === item.lang"
          color="primary"
          @click="item.onClick" />
        <v-divider />
        <v-list-subheader :title="t('display.title')" />
        <v-list-item
          :title="t('display.darkMode')"
          @click="toggleTheme">
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
import { computed, mergeProps } from 'vue'
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useThemeStore } from '../../../../stores';
import { useTheme } from 'vuetify'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()
const theme = useTheme()

const languageItems = [
  { title: t('languages.english'), onClick: () => onClick('en'), prependAvatar: '/img/us/24.png', lang: 'en' },
  { title: t('languages.french'), onClick: () => onClick('fr'), prependAvatar: '/img/fr/24.png', lang: 'fr' }
]

const language = computed(() => route.params.lang?.toString())

const onClick = (lang: string) => {
  router.replace({ params: { lang }})
}

const toggleTheme = () => {
  themeStore.darkMode = !themeStore.darkMode
  theme.global.name.value = themeStore.darkMode ? 'dark' : 'light'
}
</script>

<i18n lang="json">
  {
    "en": {
      "title": "Settings",
      "languages": {
        "title": "Languages",
        "english": "English",
        "french": "French"
      },
      "display": {
        "title": "Display",
        "darkMode": "Dark mode"
      }
    },
    "fr": {
      "title": "Paramètres",
      "languages": {
        "title": "Langues",
        "english": "English",
        "french": "Français"
      },
      "display": {
        "title": "Affichage",
        "darkMode": "Mode sombre"
      }
    }
  }
</i18n>
