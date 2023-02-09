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
    <app-progress-bar :lazy-delay="200" />
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
import AppLoginBtn from './AppLoginBtn.vue';
import AppOffline from './AppOffline.vue';
import AppSettingsMenu from './AppSettingsMenu.vue';
import AppProfileMenu from './AppProfileMenu.vue';
import AppProgressBar from '../AppProgressBar.vue'
import { useAppStore, useIdentityStore } from '../../../../stores';
import { useCoreOptions } from '../../../../composition';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const { t } = useI18n()
const appStore = useAppStore()
const identityStore = useIdentityStore()
const coreOptions = useCoreOptions()
const router = useRouter()

const { isAuthenticated } = storeToRefs(identityStore)

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
