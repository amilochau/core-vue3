<template>
  <v-app full-height>
    <v-expand-transition mode="out-in">
      <app-header-bar
        v-if="pageData.header"
        v-bind="pageData.header"
        :title="title">
        <template #append>
          <app-pwa-install />
          <app-pwa-update />
        </template>
      </app-header-bar>
    </v-expand-transition>
    <app-navigation-drawer
      :items="items"
      :append-items="appendItems" />
    <v-main>
      <router-view />
    </v-main>
    <v-expand-transition mode="out-in">
      <app-footer-bar
        v-if="pageData.footer"
        v-bind="pageData.footer" />
    </v-expand-transition>
    <app-cookies />
    <app-snackbar />
  </v-app>
</template>

<script setup lang="ts">
import { AppCookies, AppFooterBar, AppHeaderBar, AppNavigationDrawer, AppSnackbar } from '@amilochau/core-vue3/components';
import { AppPwaInstall, AppPwaUpdate } from '@amilochau/core-vue3-pwa/components';
import { useTheme } from 'vuetify';
import { useAppStore, useThemeStore } from '@amilochau/core-vue3/stores';
import { storeToRefs } from 'pinia';
import { useNotifications } from '@amilochau/core-vue3-pwa/composition';
import { useNavigation } from '@/composition/navigation';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { generateMetadataInfo } from '@amilochau/core-vue3/utils';

const appStore = useAppStore();
const { pageData } = storeToRefs(appStore);
const themeStore = useThemeStore();
const theme = useTheme();
const { items, appendItems } = useNavigation();
const route = useRoute();
const { locale } = useI18n({ useScope: 'global' });

const setTheme = (darkMode: boolean) => {
  theme.global.name.value = darkMode ? 'dark' : 'light';
};

setTheme(themeStore.darkMode);

const title = computed(() => {
  const metadataInfo = generateMetadataInfo(route.path, route.meta, locale.value);
  return metadataInfo.title;
});

// Update subscription
const { updateSubscription } = useNotifications();
void updateSubscription();
</script>
