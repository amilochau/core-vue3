<template>
  <v-app full-height>
    <v-main>
      <v-expand-transition mode="out-in">
        <app-header-bar
          v-if="pageData.header"
          v-bind="pageData.header"
          :title="pageData.header?.title ?? pageData.title" />
      </v-expand-transition>
      <router-view />
      <v-expand-transition mode="out-in">
        <app-footer-bar
          v-if="pageData.footer"
          v-bind="pageData.footer" />
      </v-expand-transition>

      <app-cookies />
      <app-navigation-drawer />
      <app-snackbar />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { AppFooterBar, AppHeaderBar } from '../components';
import AppNavigationDrawer from '../components/app/layout/AppNavigationDrawer.vue'
import AppCookies from '../components/app/layout/AppCookies.vue'
import AppSnackbar from '../components/app/layout/AppSnackbar.vue'
import { useTheme } from 'vuetify'
import { useAppStore, useThemeStore } from '../stores';
import { storeToRefs } from 'pinia';
import { useNotifications } from '../composition';

const appStore = useAppStore()
const { pageData } = storeToRefs(appStore)
const themeStore = useThemeStore()
const theme = useTheme()

const setTheme = (darkMode: boolean) => {
  theme.global.name.value = darkMode ? 'dark' : 'light'
}

setTheme(themeStore.darkMode)

// Update subscription
const { updateSubscription } = useNotifications()
updateSubscription();
</script>
