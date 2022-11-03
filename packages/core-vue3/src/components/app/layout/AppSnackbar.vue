<template>
  <v-snackbar
    v-model="display"
    :timeout="message.timeout"
    :color="message.color"
    top
    right
    class="d-print-none">
    <v-row
      align="center"
      class="pa-1">
      <v-col
        v-if="message.icon"
        class="py-0 flex-grow-0">
        <v-icon>{{ message.icon }}</v-icon>
      </v-col>
      <v-col class="py-0 flex-grow-1">
        <span style="white-space: pre-wrap">{{ message.disableTranslation ? message.title : t(message.title) }}</span>
      </v-col>
      <v-col class="py-0 d-flex flex-grow-0">
        <v-btn
          v-if="message.details"
          variant="text"
          :icon="expanded ? mdiChevronUp : mdiChevronDown"
          size="small"
          @click="expanded = !expanded" />
        <div>
          <v-btn
            variant="text"
            class="h-100"
            @click="display = false">
            {{ t('close') }}
          </v-btn>
        </div>
      </v-col>
      <v-col
        v-if="expanded && message.details"
        cols="12">
        <span style="white-space: pre-wrap">{{ message.disableTranslation ? message.details : t(message.details) }}</span>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script setup lang="ts">
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../../../stores'

const { t } = useI18n()
const appStore = useAppStore()
const { message } = storeToRefs(appStore)

const expanded = ref(false);
const display = ref(false);

watch(message, () => {
  expanded.value = false
  display.value = true
}, { deep: true })
</script>

<i18n lang="json">
  {
    "en": {
      "close": "Close"
    },
    "fr": {
      "close": "Fermer"
    }
  }
</i18n>
