<template>
  <v-container class="d-print-none">
    <v-row>
      <v-col
        align="center"
        class="py-0">
        <v-divider class="mt-2 mb-4" />
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
          :to="{ name: 'Privacy' }"
          exact
          rounded
          size="small"
          variant="text"
          class="mb-1 mr-2">
          {{ t('privacy') }}
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
      </v-col>
    </v-row>
    <v-row>
      <v-col
        align="center"
        class="py-0">
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
            <v-list-item
              prepend-avatar="/img/us/24.png"
              :title="t('languages.english')"
              @click="router.replace({ params: { lang: 'en' }})" />
            <v-list-item
              prepend-avatar="/img/fr/24.png"
              :title="t('languages.french')"
              @click="router.replace({ params: { lang: 'fr' }})" />
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useThemeStore } from '../../../../stores';
import { useCoreOptions } from '../../../../composition';
import { mdiBrightness6, mdiEarth } from '@mdi/js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify'

const { t } = useI18n()
const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()
const coreOptions = useCoreOptions()
const theme = useTheme()

const barItems = computed(() => coreOptions.application.footer?.items?.value ?? [])

const toggleTheme = () => {
  themeStore.darkMode = !themeStore.darkMode
  theme.global.name.value = themeStore.darkMode ? 'dark' : 'light'
}
</script>

<i18n lang="json">
  {
    "en": {
      "home": "Home",
      "privacy": "Privacy",
      "contact": "Contact",
      "languages": {
        "english": "English",
        "french": "French"
      }
    },
    "fr": {
      "home": "Accueil",
      "privacy": "Confidentialité",
      "contact": "Contact",
      "languages": {
        "english": "English",
        "french": "Français"
      }
    }
  }
</i18n>
