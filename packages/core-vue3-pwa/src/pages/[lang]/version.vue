<route lang="yaml">
  name: Version
  meta:
    allowAnonymous: true
    generateSsg: true
    noindex: true
    metadata:
      en:
        title: Settings – Version
        description: Version settings
      fr:
        title: Paramètres – Version
        description: Paramètres de version
  </route>

  <template>
    <app-responsive-form
      :title="t('title')"
      :links="links">
      <v-card-text>
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
  import { mdiApplicationBracesOutline, mdiCalendarEdit, mdiCalendarImport, mdiDatabase, mdiDatabaseOutline, mdiGaugeLow, mdiPoundBox, mdiUpdate } from '@mdi/js';
  import { AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/components';
  import { usePage } from '@amilochau/core-vue3/composition';
  import { useAppStore } from '@amilochau/core-vue3/stores';
  import { useI18n } from 'vue-i18n';
  import { usePwaStore } from '../../stores';
  import { computed, ref } from 'vue';
  import { useOnline } from '@vueuse/core';
  import { storeToRefs } from 'pinia';
  import type { BuildData } from '../../types';

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

  const { d, n, t } = useI18n();
  const buttonMode = ref<'back' | 'default-back'>('back');
  usePage(computed(() => ({
    header: {
      buttonMode: buttonMode.value,
      defaultBackTo: { name: 'Home' },
    },
  })));
  const online = useOnline();
  const appStore = useAppStore();
  const { loading } = storeToRefs(appStore);
  const pwaStore = usePwaStore();
  const { updateDisplay, updateLoading } = storeToRefs(pwaStore);

  // Storage data
  const storageEstimate = ref<StorageEstimate | undefined>(undefined);
  void navigator.storage.estimate().then(value => storageEstimate.value = value);
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

  // Build data
  const buildData = window.buildData;
  const versionItems = computed(() => ([
    ...buildData.commitDate ? [{ title: d(buildData.commitDate, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }), subtitle: t('version.commitDate'), prependIcon: mdiCalendarEdit }] : [],
    ...buildData.buildDate ? [{ title: d(buildData.buildDate, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }), subtitle: t('version.buildDate'), prependIcon: mdiCalendarImport }] : [],
    ...buildData.commitSha ? [{ title: buildData.commitSha, subtitle: t('version.commitSha'), prependIcon: mdiPoundBox }] : [],
  ]));

  const links = computed(() => ([]));
  </script>

  <i18n lang="yaml">
  en:
    title: Settings – Version
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
  fr:
    title: Paramètres – Version
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
  </i18n>
