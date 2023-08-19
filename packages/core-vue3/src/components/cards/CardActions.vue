<template>
  <v-card-item class="bg-primary py-1">
    <v-tooltip location="start">
      <template #activator="{ props: tooltip }">
        <v-icon
          v-if="!online"
          v-bind="tooltip"
          :icon="mdiWifiStrengthAlertOutline"
          color="warning" />
      </template>
      <span>{{ t('offlineTitle') }}</span>
    </v-tooltip>
    <template #append>
      <v-btn
        :disabled="loading"
        :prepend-icon="cancelIconOrDefault"
        variant="text"
        color="grey-lighten-2"
        @click="emits('close')">
        {{ cancelTitleOrDefault }}
      </v-btn>
      <v-btn
        :disabled="loading || !online"
        :loading="loading"
        :prepend-icon="saveIconOrDefault"
        variant="text"
        @click="emits('save')">
        {{ saveTitleOrDefault }}
      </v-btn>
    </template>
  </v-card-item>
</template>

<script setup lang="ts">
import { useAppStore } from '../../stores'
import { mdiPencil, mdiWifiStrengthAlertOutline } from '@mdi/js';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const appStore = useAppStore()
const { loading } = storeToRefs(appStore)
const online = useOnline()
const { t } = useI18n()

const props = defineProps<{
  cancelTitle?: string,
  cancelIcon?: string,
  saveTitle?: string,
  saveIcon?: string
}>()

const emits = defineEmits<{
  (eventName: 'close'): void,
  (eventName: 'save'): void
}>()

const cancelTitleOrDefault = computed(() => props.cancelTitle ?? t('cancel'))
const cancelIconOrDefault = computed(() => props.cancelIcon ?? undefined)
const saveTitleOrDefault = computed(() => props.saveTitle ?? t('save'))
const saveIconOrDefault = computed(() => props.saveIcon ?? mdiPencil)
</script>

<i18n lang="yaml">
en:
  offlineTitle: You lost your Internet connection...
  cancel: Cancel
  save: Save
fr:
  offlineTitle: Vous avez perdu votre connexion Internet...
  cancel: Annuler
  save: Sauvegarder
</i18n>
