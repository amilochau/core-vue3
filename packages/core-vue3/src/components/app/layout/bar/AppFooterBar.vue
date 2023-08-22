<template>
  <v-footer
    class="d-print-none d-flex flex-column text-center border-t">
    <div>
      <v-btn
        :to="{ name: 'Home' }"
        exact
        rounded
        size="small"
        variant="text"
        class="mb-1 mr-2">
        {{ t('home') }}
      </v-btn>
      <v-btn
        :to="{ name: 'Settings' }"
        exact
        rounded
        size="small"
        variant="text"
        class="mb-1 mr-2">
        {{ t('settings') }}
      </v-btn>
      <v-btn
        :href="`https://contact.milochau.com/${route.params.lang}`"
        rounded
        size="small"
        variant="text"
        target="_blank"
        rel="noopener"
        class="mb-1">
        {{ t('contact') }}
      </v-btn>
      <v-btn
        v-for="(item, i) in barItems"
        :key="i"
        :href="item.link"
        rounded
        size="small"
        variant="text"
        target="_blank"
        rel="noopener"
        class="mb-1">
        {{ item.title }}
      </v-btn>
    </div>
    <div>
      <v-btn
        :icon="mdiBrightness6"
        variant="text"
        class="mr-2"
        @click="toggleTheme" />
      <v-menu location="top end">
        <template #activator="{ props: menuProps }">
          <v-btn
            v-bind="menuProps"
            :icon="mdiEarth"
            variant="text" />
        </template>
        <v-list>
          <v-list-subheader>{{ t('languages.title') }}</v-list-subheader>
          <v-list-item
            v-for="(item, i) in languagesItems"
            :key="i"
            :title="item.title"
            :prepend-icon="mdiEarth"
            :active="language === item.lang"
            color="primary"
            @click="router.replace({ params: { lang: item.lang }, query: route.query })" />
        </v-list>
      </v-menu>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { useThemeStore } from '../../../../stores';
import { mdiBrightness6, mdiEarth } from '@mdi/js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify'

const props = defineProps<{
  items?: {
    link: string,
    title: string,
  }[]
}>()

const { t } = useI18n()
const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()
const theme = useTheme()

const barItems = computed(() => props.items ?? [])
const language = computed(() => route.params.lang?.toString())

const toggleTheme = () => {
  themeStore.darkMode = !themeStore.darkMode
  theme.global.name.value = themeStore.darkMode ? 'dark' : 'light'
}

const languagesItems = computed(() => ([
  { title: t('languages.english'), lang: 'en' },
  { title: t('languages.french'), lang: 'fr' },
]))

</script>

<i18n lang="yaml">
en:
  home: Home
  settings: Settings
  contact: Contact
  languages:
    title: Display language
    english: English
    french: French
fr:
  home: Accueil
  settings: Paramètres
  contact: Contact
  languages:
    title: Langue d'affichage
    english: English
    french: Français
</i18n>
