<template>
  <v-app>
    <v-main>
      <div class="d-flex fill-height flex-column">
        <app-cookies />
        <router-view />
        <app-navigation-drawer />
        <app-snackbar />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppNavigationDrawer from '../components/app/layout/AppNavigationDrawer.vue'
import AppCookies from '../components/app/layout/AppCookies.vue'
import AppSnackbar from '../components/app/layout/AppSnackbar.vue'
import { useTheme } from 'vuetify'
import { useThemeStore } from '../stores';

const themeStore = useThemeStore()
const theme = useTheme()

const setTheme = (darkMode: boolean) => {
  theme.global.name.value = darkMode ? 'dark' : 'light'
}

setTheme(themeStore.darkMode)
</script>
