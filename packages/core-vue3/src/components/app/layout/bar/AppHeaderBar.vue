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
      <slot name="prepend" />
    </template>
    <v-app-bar-title
      class="ml-4"
      :class="{
        'clickable': !!contentTo
      }"
      :to="contentTo">
      {{ title }}
    </v-app-bar-title>
    <app-progress-bar :lazy-delay="200" />
    <template #append>
      <app-offline />
      <slot name="append" />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js';
import AppOffline from './AppOffline.vue';
import AppProgressBar from '../AppProgressBar.vue';
import { useAppStore } from '../../../../stores';
import { type RouteLocationRaw, useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps<{
  /** Title text.  */
  title?: string
  /** Link to add to the content. */
  contentTo?: RouteLocationRaw
  /** Button mode, in first position. */
  buttonMode?: 'drawer' | 'back' | 'default-back'
  /** Default link, used as a fallback value when no history is found with the buttonMode set to 'back'.  */
  defaultBackTo?: RouteLocationRaw
}>();

defineSlots<{
  prepend?(): any,
  append?(): any,
}>();

const appStore = useAppStore();
const router = useRouter();

const toggleDrawer = () => {
  appStore.setDrawer(!appStore.drawer);
};

const buttonType = computed(() => {
  if (props.buttonMode === 'back' && (router.options.history.state.back || props.defaultBackTo)) {
    return 'arrow-left';
  } else if (props.buttonMode === 'default-back' && props.defaultBackTo) {
    return 'arrow-left';
  } else {
    return 'nav';
  }
});

const onBackButtonClick = async () => {
  if (props.buttonMode === 'back' && router.options.history.state.back) {
    router.back();
  } else if (props.defaultBackTo) {
    await router.replace(props.defaultBackTo);
  }
};
</script>
