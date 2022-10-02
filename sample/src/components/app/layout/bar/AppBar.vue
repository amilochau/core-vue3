<template>
  <v-app-bar
    app
    density="compact"
    class="border-b"
    flat>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-app-bar-title class="ml-4">
      {{ t('app.header.bar.title') }}
    </v-app-bar-title>
    <v-spacer />
    <app-offline />
    <app-settings-menu />
    <app-profile-menu v-if="isAuthenticated" />
    <app-login-btn v-else />
  </v-app-bar>
</template>

<script setup lang="ts">
import AppLoginBtn from './AppLoginBtn.vue';
import AppOffline from './AppOffline.vue';
import AppSettingsMenu from './AppSettingsMenu.vue';
import AppProfileMenu from './AppProfileMenu.vue';
import { useAppStore } from '../../../../stores';
import { useI18n } from 'vue-i18n';
import { useIsAuthenticated } from '../../../../composition/msal';

const { t } = useI18n()
const appStore = useAppStore()
const isAuthenticated = useIsAuthenticated();

function toggleDrawer() {
  appStore.setDrawer(!appStore.drawer)
}
</script>
