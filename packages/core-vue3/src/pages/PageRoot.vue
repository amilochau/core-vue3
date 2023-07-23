<template>
  <v-main>
    <div class="d-flex fill-height flex-column">
      <app-header-bar v-if="!coreOptions.application.header.disabled" />
      <app-cookies />
      <router-view v-slot="{ Component }">
        <v-fade-transition mode="out-in">
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
      <app-navigation-drawer />
      <app-footer-bar v-if="coreOptions.application.footer?.enabled" />
      <app-snackbar />
    </div>
  </v-main>
</template>

<script setup lang="ts">
import AppFooterBar from '../components/app/layout/bar/AppFooterBar.vue'
import AppHeaderBar from '../components/app/layout/bar/AppHeaderBar.vue'
import AppNavigationDrawer from '../components/app/layout/AppNavigationDrawer.vue'
import AppCookies from '../components/app/layout/AppCookies.vue'
import AppSnackbar from '../components/app/layout/AppSnackbar.vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocale, useTheme } from 'vuetify'
import { useLanguageStore, useThemeStore } from '../stores';
import { useCoreOptions } from '../composition';

const i18n = useI18n({ useScope: 'global' })
const route = useRoute()
const languageStore = useLanguageStore()
const themeStore = useThemeStore()
const { current } = useLocale()
const coreOptions = useCoreOptions()
const theme = useTheme()

const setLanguage = (lang: string) => {
  if (lang) {
    languageStore.setLanguage(lang)
    document.querySelector('html')?.setAttribute('lang', lang)
    i18n.locale.value = lang
    current.value = lang
  }
}

const setTheme = (darkMode: boolean) => {
  theme.global.name.value = darkMode ? 'dark' : 'light'
}

setLanguage(route.params.lang?.toString())
setTheme(themeStore.darkMode)

onBeforeRouteUpdate((to) => {
  const lang = to.params.lang?.toString()
  setLanguage(lang)
})
</script>
