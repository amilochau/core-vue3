<template>
  <v-app-bar
    density="compact"
    class="border-b"
    flat
    app>
    <template #prepend>
      <v-scroll-y-reverse-transition mode="out-in">
        <v-btn
          v-if="buttonType === 'arrow-left'"
          :icon="mdiArrowLeft"
          @click="onBackButtonClick" />
        <v-app-bar-nav-icon
          v-else
          @click="toggleDrawer" />
      </v-scroll-y-reverse-transition>
      <v-img
        v-if="contentMode === 'img'"
        :alt="title"
        :src="coreOptions.application.logoUrl"
        :width="40"
        :class="{
          'ml-2': true,
          'clickable': !!contentTo
        }"
        :to="contentTo" />
      <slot name="prepend" />
    </template>
    <v-app-bar-title
      v-if="!contentMode || contentMode === 'title'"
      :class="{
        'ml-4': true,
        'clickable': !!contentTo
      }"
      :to="contentTo">
      {{ title }}
    </v-app-bar-title>
    <app-progress-bar :lazy-delay="200" />
    <template #append>
      <slot name="append" />
      <app-update-pwa />
      <app-offline />
      <app-login-btn />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js';
import AppLoginBtn from './AppLoginBtn.vue';
import AppOffline from './AppOffline.vue';
import AppUpdatePwa from './AppUpdatePwa.vue'
import AppProgressBar from '../AppProgressBar.vue'
import { useAppStore } from '../../../../stores';
import { useCoreOptions, useNavigation } from '../../../../composition';
import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps<{
  contentMode?: 'title' | 'img'
  title?: string
  contentTo?: RouteLocationRaw
  buttonMode?: 'drawer' | 'back' | 'default-back'
  defaultBackTo?: RouteLocationRaw
}>()

const appStore = useAppStore()
const coreOptions = useCoreOptions()
const router = useRouter()
const { hasStateHistory } = useNavigation()

const toggleDrawer = () => {
  appStore.setDrawer(!appStore.drawer)
}

const buttonType = computed(() => {
  if (props.buttonMode === 'back' && (hasStateHistory.value || props.defaultBackTo)) {
    return 'arrow-left'
  } else if (props.buttonMode === 'default-back' && props.defaultBackTo) {
    return 'arrow-left'
  } else {
    return 'nav'
  }
})

const onBackButtonClick = async () => {
  if (props.buttonMode === 'back' && hasStateHistory.value) {
    router.back()
  } else if (props.defaultBackTo) {
    await router.replace(props.defaultBackTo)
  }
}
</script>
