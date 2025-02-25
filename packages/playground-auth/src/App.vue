<template>
  <v-app full-height>
    <v-main>
      <v-expand-transition mode="out-in">
        <app-header-bar
          v-if="pageData.header"
          v-bind="pageData.header"
          :title="pageData.header?.title">
          <template #append>
            <app-pwa-install />
            <app-pwa-update />
          </template>
        </app-header-bar>
      </v-expand-transition>
      <router-view />
      <v-expand-transition mode="out-in">
        <app-footer-bar
          v-if="pageData.footer"
          v-bind="pageData.footer" />
      </v-expand-transition>
      <app-cookies />
      <app-navigation-drawer
        :items="items"
        :append-items="appendItems" />
      <app-snackbar />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { AppCookies, AppFooterBar, AppHeaderBar, AppNavigationDrawer, AppSnackbar } from '@amilochau/core-vue3/components';
import { useTheme } from 'vuetify';
import { useAppStore, useThemeStore } from '@amilochau/core-vue3/stores';
import { storeToRefs } from 'pinia';
import { useNotifications } from '@amilochau/core-vue3/composition';
import { useNavigation } from '@/composition/navigation';

const appStore = useAppStore();
const { pageData } = storeToRefs(appStore);
const themeStore = useThemeStore();
const theme = useTheme();
const { items, appendItems } = useNavigation();

const setTheme = (darkMode: boolean) => {
  theme.global.name.value = darkMode ? 'dark' : 'light';
};

setTheme(themeStore.darkMode);

// Update subscription
const { updateSubscription } = useNotifications();
void updateSubscription();
</script>
