<template>
  <v-card-item class="bg-primary py-1">
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
import { mdiPencil } from '@mdi/js';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../../stores/index.js';

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

const cancelTitleOrDefault = computed(() => props.cancelTitle ?? t('cards.cancel'))
const cancelIconOrDefault = computed(() => props.cancelIcon ?? undefined)
const saveTitleOrDefault = computed(() => props.saveTitle ?? t('cards.save'))
const saveIconOrDefault = computed(() => props.saveIcon ?? mdiPencil)
</script>
