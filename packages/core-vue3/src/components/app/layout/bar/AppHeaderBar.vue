<template>
  <v-app-bar
    app
    density="compact"
    class="border-b"
    flat>
    <template #prepend>
      <v-btn
        v-if="(buttonMode === 'back' || buttonMode === 'default-back') && (hasStateHistory || defaultBackTo)"
        :icon="mdiArrowLeft"
        @click="onBackButtonClick" />
      <v-app-bar-nav-icon
        v-else
        @click="toggleDrawer" />
      <v-img
        v-if="contentMode === 'img'"
        :alt="t('appTitle')"
        :src="coreOptions.application.logoUrl"
        :width="40"
        :class="{
          'ml-2': true,
          'clickable-title': !!contentTo
        }"
        :to="contentTo" />
    </template>
    <v-app-bar-title
      v-if="!contentMode || contentMode === 'title'"
      :class="{
        'ml-4': true,
        'clickable-title': !!contentTo
      }"
      :to="contentTo">
      {{ title }}
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
import { mdiArrowLeft } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import AppLoginBtn from './AppLoginBtn.vue';
import AppOffline from './AppOffline.vue';
import AppSettingsMenu from './AppSettingsMenu.vue';
import AppProfileMenu from './AppProfileMenu.vue';
import AppProgressBar from '../AppProgressBar.vue'
import { useAppStore, useIdentityStore } from '../../../../stores';
import { useCoreOptions } from '../../../../composition';
import { storeToRefs } from 'pinia';
import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps<{
  contentMode?: 'title' | 'img'
  title?: string
  contentTo?: RouteLocationRaw
  buttonMode?: 'drawer' | 'back' | 'default-back'
  backTo?: RouteLocationRaw
  defaultBackTo?: RouteLocationRaw
}>()

const { t, mergeLocaleMessage } = useI18n()
const appStore = useAppStore()
const identityStore = useIdentityStore()
const coreOptions = useCoreOptions()
const { isAuthenticated } = storeToRefs(identityStore)
const router = useRouter()

const toggleDrawer = () => {
  appStore.setDrawer(!appStore.drawer)
}

const hasStateHistory = computed(() => !!window.history.state.back)
const onBackButtonClick = async () => {
  if (props.buttonMode === 'back' && hasStateHistory.value) {
    console.log('FROM HEADER: router.back')
    router.back()
  } else if (props.defaultBackTo) {
    console.log('FROM HEADER: router.replace(props.defaultBackTo)')
    await router.replace(props.defaultBackTo)
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
