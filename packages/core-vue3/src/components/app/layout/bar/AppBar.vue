<template>
  <v-app-bar
    app
    density="compact"
    class="border-b"
    flat>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-app-bar-title
      :class="{
        'ml-4': true,
        'clickable-title': coreOptions.application.onAppBarTitleClick
      }"
      @click="onTitleClick">
      {{ t('appTitle') }}
    </v-app-bar-title>
    <app-offline />
    <app-settings-menu />
    <app-profile-menu v-if="isAuthenticated" />
    <app-login-btn v-else />
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
import AppLoginBtn from './AppLoginBtn.vue';
import AppOffline from './AppOffline.vue';
import AppSettingsMenu from './AppSettingsMenu.vue';
import AppProfileMenu from './AppProfileMenu.vue';
import { useAppStore } from '../../../../stores';
import { useCognito, useCoreOptions } from '../../../../composition';
import { useRouter } from 'vue-router';

const { t } = useI18n()
const appStore = useAppStore()
const { isAuthenticated } = useCognito();
const coreOptions = useCoreOptions()
const router = useRouter()

function toggleDrawer() {
  appStore.setDrawer(!appStore.drawer)
}

function onTitleClick() {
  if (coreOptions.application.onAppBarTitleClick) {
    coreOptions.application.onAppBarTitleClick(router)
  }
}
</script>

<style scoped>
.clickable-title {
  cursor: pointer;
}
</style>
