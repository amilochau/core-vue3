<template>
  <v-app-bar
    app
    density="compact"
    class="border-b"
    flat>
    <template #prepend>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-img
        v-if="coreOptions.application.logoUrl"
        :alt="t('appTitle')"
        :src="coreOptions.application.logoUrl"
        :width="40"
        :class="{
          'ml-2': true,
          'clickable-title': coreOptions.application.header.onTitleClick
        }"
        @click="onTitleClick" />
    </template>
    <v-app-bar-title
      :class="{
        'ml-4': true,
        'clickable-title': coreOptions.application.header.onTitleClick
      }"
      @click="onTitleClick">
      {{ t('appTitle') }}
    </v-app-bar-title>
    <template #append>
      <app-offline />
      <app-settings-menu />
      <app-profile-menu v-if="coreOptions.authenticationEnabled && isAuthenticated" />
      <app-login-btn v-else-if="coreOptions.authenticationEnabled" />
      <app-progress-bar :lazy-delay="200" />
    </template>
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

const { t, mergeLocaleMessage } = useI18n()
const appStore = useAppStore()
const identityStore = useIdentityStore()
const coreOptions = useCoreOptions()
const router = useRouter()

const { isAuthenticated } = storeToRefs(identityStore)

const toggleDrawer = () => {
  appStore.setDrawer(!appStore.drawer)
}

const onTitleClick = () => {
  if (coreOptions.application.header.onTitleClick) {
    coreOptions.application.header.onTitleClick(router)
  }
}

Object.entries(coreOptions.i18n.messages).map(([key, item]) => {
  mergeLocaleMessage(key, {
    appTitle: item.appTitle
  })
})
</script>

<style scoped>
.clickable-title {
  cursor: pointer;
}
</style>
