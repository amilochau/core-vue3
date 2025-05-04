<route lang="yaml">
  name: Notifications
  meta:
    allowAnonymous: true
    generateSsg: true
    noindex: true
    metadata:
      en:
        title: Settings – Notifications
        description: Notifications settings
      fr:
        title: Paramètres – Notifications
        description: Paramètres des notifications
  </route>

  <template>
    <app-responsive-form
      :title="t('title')"
      :links="links">
      <v-card-text>
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
        </template>
      </v-card-text>
    </app-responsive-form>
  </template>

  <script setup lang="ts">
  import { mdiBellAlertOutline, mdiBellCheckOutline, mdiBellMinus, mdiBellOutline, mdiBellPlus } from '@mdi/js';
  import { AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/components';
  import { usePage } from '@amilochau/core-vue3/composition';
  import { useAppStore } from '@amilochau/core-vue3/stores';
  import { useI18n } from 'vue-i18n';
  import { useNotifications } from '../../composition';
  import { computed, ref } from 'vue';
  import { useOnline } from '@vueuse/core';
  import { storeToRefs } from 'pinia';

  const { t } = useI18n();
  const buttonMode = ref<'back' | 'default-back'>('back');
  usePage(computed(() => ({
    header: {
      buttonMode: buttonMode.value,
      defaultBackTo: { name: 'Home' },
    },
  })));
  const notifications = useNotifications();
  const online = useOnline();
  const appStore = useAppStore();
  const { loading } = storeToRefs(appStore);

  const links = computed(() => ([]));
  </script>

  <i18n lang="yaml">
  en:
    title: Settings – Notifications
    notifications:
      title: Notifications
      summary: Notifications make it easy to stay informed, right on your device.
      enabled: Notifications are enabled on this device!
      disabled: Notifications are not enabled on this device!
      subscribe: Enable notifications
      unsubscribe: Disable notifications
  fr:
    title: Paramètres – Notifications
    notifications:
      title: Notifications
      summary: Les notifications vous permettent d'être informé facilement, directement sur votre appareil.
      enabled: Les notifications sont activées sur cet appareil !
      disabled: Les notifications ne sont pas activées sur cet appareil !
      subscribe: Activer les notifications
      unsubscribe: Désactiver les notifications
  </i18n>
