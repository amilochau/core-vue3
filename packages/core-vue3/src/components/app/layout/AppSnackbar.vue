<template>
  <v-snackbar
    v-model="display"
    :timeout="snackbarMessage.timeout_ms ?? 10000"
    :color="snackbarMessage.color ?? 'primary'"
    :close-on-back="false"
    top
    right
    class="d-print-none">
    <v-row class="pa-1 align-center">
      <v-col
        v-if="snackbarMessage.icon"
        class="py-0 flex-grow-0">
        <v-icon>{{ snackbarMessage.icon }}</v-icon>
      </v-col>
      <v-col class="py-0 flex-grow-1">
        <span class="pre-wrap">{{ snackbarMessage.title }}</span>
      </v-col>
      <v-col class="py-0 d-flex flex-grow-0">
        <v-btn
          v-if="snackbarMessage.details && snackbarMessage.details.length"
          variant="text"
          :icon="expanded ? mdiChevronUp : mdiChevronDown"
          size="small"
          @click="expanded = !expanded" />
        <div>
          <v-btn
            variant="text"
            class="fill-height"
            rounded
            @click="display = false">
            {{ t('close') }}
          </v-btn>
        </div>
      </v-col>
      <v-col
        v-if="expanded && snackbarMessage.details && snackbarMessage.details.length"
        cols="12">
        <span class="pre-wrap">{{ snackbarMessage.details }}</span>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script setup lang="ts">
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../../../stores';

const { t } = useI18n();
const appStore = useAppStore();
const { snackbarMessage } = storeToRefs(appStore);

const expanded = ref(false);
const display = ref(false);

watch(snackbarMessage, (newValue) => {
  if (newValue.title) {
    expanded.value = false;
    display.value = true;
  } else {
    display.value = false;
  }
}, { deep: true });
</script>

<i18n lang="yaml">
en:
  close: Close
fr:
  close: Fermer
</i18n>
