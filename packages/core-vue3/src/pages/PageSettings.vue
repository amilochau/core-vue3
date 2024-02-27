<template>
  <app-responsive-form
    :title="t('title')"
    :links="links">
    <v-card-text>
      <card-section-title
        :icon="mdiBrightness6"
        :title="t('display.title')" />
      <v-switch
        :model-value="themeStore.darkMode"
        :label="t('display.darkMode')"
        @update:model-value="toggleTheme" />
      <v-divider class="my-4" />
      <card-section-title
        :icon="mdiEarth"
        :title="t('languages.title')" />
      <v-chip-group
        :model-value="language"
        column
        mandatory
        selected-class="text-primary">
        <v-chip
          v-for="(languageItem, i) in languageItems"
          :key="i"
          :value="languageItem.lang"
          @click="changeLang(languageItem.lang)">
          {{ languageItem.title }}
        </v-chip>
      </v-chip-group>
      <v-divider class="my-4" />
      <card-section-title
        :icon="mdiGavel"
        :title="t('privacy.title')" />
      <v-switch
        :model-value="!cookiesStore.showCookies && cookiesStore.accepted"
        :label="t('privacy.cookies')"
        @update:model-value="toggleCookies" />
      <v-alert
        v-if="!cookiesStore.showCookies && cookiesStore.expiration"
        border="start"
        type="info"
        variant="tonal"
        class="mb-3">
        {{ t('privacy.expiration', { expirationDate: d(cookiesStore.expiration) }) }}
      </v-alert>
      <v-divider class="my-4" />
      <template v-if="notifications.isSupported.value">
        <card-section-title
          :icon="mdiBellOutline"
          :title="t('notifications.title')" />
        <p class="mb-2">
          {{ t('notifications.summary') }}
        </p>
        <p v-if="notifications.isRegistred.value">
          <v-icon
            :icon="mdiBellCheckOutline"
            class="mr-2"
            color="success" />
          {{ t('notifications.enabled') }}
        </p>
        <p v-else>
          <v-icon
            :icon="mdiBellAlertOutline"
            class="mr-2"
            color="error" />
          {{ t('notifications.disabled') }}
        </p>
        <div class="text-center">
          <v-btn-action
            v-if="notifications.isRegistred.value"
            :disabled="loading || !online"
            :loading="loading"
            :prepend-icon="mdiBellMinus"
            class="my-2"
            color="warning"
            @click="notifications.unsubscribe">
            {{ t('notifications.unsubscribe') }}
          </v-btn-action>
          <v-btn-action
            v-else
            :disabled="loading || !online"
            :loading="loading"
            :prepend-icon="mdiBellPlus"
            class="my-2"
            color="primary"
            @click="notifications.subscribe">
            {{ t('notifications.subscribe') }}
          </v-btn-action>
        </div>
        <v-divider class="my-4" />
      </template>
      <card-section-title
        :icon="mdiDatabaseOutline"
        :title="t('storage.title')" />
      <v-list
        :items="storageItems"
        item-props
        :lines="false" />
      <v-divider class="my-4" />
      <card-section-title
        :icon="mdiApplicationBracesOutline"
        :title="t('version.title')" />
      <v-list
        :items="versionItems"
        item-props
        :lines="false" />
      <v-alert
        v-if="updateDisplay"
        :icon="mdiUpdate"
        border="start"
        color="primary"
        variant="tonal"
        class="mb-3 text-center">
        <p class="text-left">
          {{ t('version.update.desc') }}
        </p>
        <v-btn-action
          :disabled="updateLoading || loading || !online"
          :prepend-icon="mdiUpdate"
          :loading="loading"
          color="primary"
          class="mt-2"
          @click="pwaStore.update">
          {{ t('version.update.action') }}
        </v-btn-action>
      </v-alert>
      <v-alert
        v-else
        border="start"
        type="success"
        variant="tonal"
        class="mb-3">
        {{ t('version.update.success') }}
      </v-alert>
    </v-card-text>
  </app-responsive-form>
</template>

<script setup lang="ts">
import { mdiApplicationBracesOutline, mdiBellAlertOutline, mdiBellCheckOutline, mdiBellMinus, mdiBellOutline, mdiBellPlus, mdiBrightness6, mdiCalendarEdit, mdiCalendarImport, mdiDatabase, mdiDatabaseOutline, mdiEarth, mdiGaugeLow, mdiGavel, mdiPoundBox, mdiUpdate } from '@mdi/js';
import { AppResponsiveForm, CardSectionTitle } from '../components';
import { useI18n } from 'vue-i18n';
import { useNotifications, usePage } from '../composition';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore, useCookiesStore, usePwaStore, useThemeStore } from '../stores';
import { useTheme } from 'vuetify';
import { computed, ref } from 'vue';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import type { BuildData } from '../types';

declare global {
  interface Window {
    buildData: BuildData;
  }

  interface StorageEstimate {
    usageDetails?: {
      [key: string]: number;
    };
  }
}

const { d, n, t, mergeDateTimeFormat } = useI18n();
const buttonMode = ref<'back' | 'default-back'>('back');
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: buttonMode.value,
    defaultBackTo: { name: 'Home' },
  },
})));
const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();
const theme = useTheme();
const cookiesStore = useCookiesStore();
const notifications = useNotifications();
const online = useOnline();
const appStore = useAppStore();
const { loading } = storeToRefs(appStore);
const pwaStore = usePwaStore();
const { updateDisplay, updateLoading } = storeToRefs(pwaStore);

mergeDateTimeFormat('en', {
  datetime: {
    year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
  },
});
mergeDateTimeFormat('fr', {
  datetime: {
    year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
  },
});

// Theme
const toggleTheme = () => {
  themeStore.darkMode = !themeStore.darkMode;
  theme.global.name.value = themeStore.darkMode ? 'dark' : 'light';
};

// Language
const language = computed(() => route.params.lang?.toString());
const languageItems = computed(() => ([
  { title: t('languages.english'), lang: 'en' },
  { title: t('languages.french'), lang: 'fr' },
]));

const changeLang = async (lang: string) => {
  await router.replace({ params: { lang: lang }, query: route.query });
  buttonMode.value = 'default-back';
};

// Privacy
const toggleCookies = (event: any) => {
  if (event as boolean) {
    cookiesStore.acceptCookies();
  } else {
    cookiesStore.refuseCookies();
  }
};

// Storage data
const storageEstimate = ref<StorageEstimate | undefined>(undefined);
navigator.storage.estimate().then(value => storageEstimate.value = value);
const memoryUsage = computed(() => storageEstimate.value?.usage ?? 0);
const memoryUsageDetails = computed(() => Object.entries(storageEstimate.value?.usageDetails ? storageEstimate.value.usageDetails : {}));
const quotaUsage = computed(() => (storageEstimate.value?.usage ?? 0) / (storageEstimate.value?.quota ?? 1));
const storageItems = computed(() => ([
  {
    title: n(memoryUsage.value / 1024 / 1024, { style: 'unit', maximumSignificantDigits: 3, minimumSignificantDigits: 2, unit: 'megabyte', unitDisplay: 'short' }),
    subtitle: t('storage.memory'),
    prependIcon: mdiDatabase,
    children: memoryUsageDetails.value.length ? memoryUsageDetails.value.map(([k, v]) => ({ title: n(v / 1024 / 1024, { style: 'unit', maximumSignificantDigits: 3, minimumSignificantDigits: 2, unit: 'megabyte', unitDisplay: 'short' }), subtitle: k })) : undefined,
  },
  {
    title: n(quotaUsage.value, { style: 'percent', maximumFractionDigits: 1 }),
    subtitle: t('storage.quota'),
    prependIcon: mdiGaugeLow,
  },
]));

// text-capitalize

// Build data
const buildData = window.buildData as BuildData;
const versionItems = computed(() => ([
  ...buildData.commitDate ? [{ title: d(buildData.commitDate, 'datetime'), subtitle: t('version.commitDate'), prependIcon: mdiCalendarEdit }] : [],
  ...buildData.buildDate ? [{ title: d(buildData.buildDate, 'datetime'), subtitle: t('version.buildDate'), prependIcon: mdiCalendarImport }] : [],
  ...buildData.commitSha ? [{ title: buildData.commitSha, subtitle: t('version.commitSha'), prependIcon: mdiPoundBox }] : [],
]));

const links = computed(() => ([
  { title: t('links.privacy.title'), subtitle: t('links.privacy.subtitle'), prependIcon: mdiGavel, to: { name: 'Privacy' } },
]));
</script>

<i18n lang="yaml">
  en:
    pageTitle: Settings
    pageDescription: Settings page
  fr:
    pageTitle: Paramètres
    pageDescription: Page de paramètres
</i18n>

<i18n lang="yaml">
en:
  title: Settings
  languages:
    title: Languages
    english: English
    french: French
  display:
    title: Display
    darkMode: Dark mode
  privacy:
    title: Privacy
    cookies: Accept cookies
    expiration: Your answer expires on {expirationDate}. You'll then be asked again.
  notifications:
    title: Notifications
    summary: Notifications make it easy to stay informed, right on your device.
    enabled: Notifications are enabled on this device!
    disabled: Notifications are not enabled on this device!
    subscribe: Enable notifications
    unsubscribe: Disable notifications
  storage:
    title: Storage and memory
    memory: Memory used by the application to store offline data
    quota: Memory quota used on the device
  version:
    title: Application version
    buildDate: Application deployment date
    commitDate: Last modification date
    commitSha: Version unique reference
    update:
      desc: A new version is available. You can get the latest content by updating this application!
      action: Update
      success: You have the latest version of the application!
  links:
    privacy:
      title: Privacy policy
      subtitle: Read the privacy policy to understand which data we use, and why.
fr:
  title: Paramètres
  languages:
    title: Langues
    english: English
    french: Français
  display:
    title: Affichage
    darkMode: Mode sombre
  privacy:
    title: Confidentialité
    cookies: Accepter les cookies
    expiration: Votre réponse expirera le {expirationDate}. Vous serez alors interrogé de nouveau.
  notifications:
    title: Notifications
    summary: Les notifications vous permettent d'être informé facilement, directement sur votre appareil.
    enabled: Les notifications sont activées sur cet appareil !
    disabled: Les notifications ne sont pas activées sur cet appareil !
    subscribe: Activer les notifications
    unsubscribe: Désactiver les notifications
  storage:
    title: Stockage et mémoire
    memory: Mémoire utilisée par l'application pour les données hors-ligne
    quota: Quota de mémoire de l'appareil utilisé
  version:
    title: Version de l'application
    buildDate: Date de déploiement de l'application
    commitDate: Date de dernière modification
    commitSha: Référence unique de la version
    update:
      desc: Une nouvelle version est disponible. Vous pouvez obtenir le dernier contenu en mettant à jour cette application !
      action: Mettre à jour
      success: Vous avez la dernière version de l'application !
  links:
    privacy:
      title: Politique de confidentialité
      subtitle: Lisez la politique de confidentialité, pour comprendre quelles données nous utilisons, et pourquoi.
</i18n>
