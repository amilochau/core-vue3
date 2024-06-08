<template>
  {{ snackbarMessagesQueue }}
  <v-snackbar-queue
    v-model="snackbarMessagesQueue"
    :close-on-back="false"
    class="d-print-none">
    <template #text="{ item }">
      <v-row class="pa-1 align-center">
        <v-col
          v-if="item.icon"
          class="py-0 flex-grow-0">
          <v-icon>{{ item.icon }}</v-icon>
        </v-col>
        <v-col class="py-0 flex-grow-1">
          <span class="pre-wrap">{{ item.text }}</span>
        </v-col>
        <v-col class="py-0 d-flex flex-grow-0">
          <v-btn
            v-if="item.details && item.details.length"
            variant="text"
            :icon="item.expanded ? mdiChevronUp : mdiChevronDown"
            size="small"
            @click="item.expanded = !item.expanded" />
          <div>
            <v-btn
              variant="text"
              class="fill-height"
              rounded
              @click="item.hide = true">
              {{ t('close') }}
            </v-btn>
          </div>
        </v-col>
        <v-col
          v-if="item.expanded && item.details && item.details.length"
          cols="12">
          <span class="pre-wrap">{{ item.details }}</span>
        </v-col>
      </v-row>
    </template>
  </v-snackbar-queue>

    <!--
    <template #default="{ item }">
      <v-snackbar
        :model-value="!item.hide"
        :timeout="item.timeout_ms ?? 10000"
        :color="item.color ?? 'primary'"
        :close-on-back="false"
        top
        right
        class="d-print-none">
        <v-row class="pa-1 align-center">
          <v-col
            v-if="item.icon"
            class="py-0 flex-grow-0">
            <v-icon>{{ item.icon }}</v-icon>
          </v-col>
          <v-col class="py-0 flex-grow-1">
            <span class="pre-wrap">{{ item.title }}</span>
          </v-col>
          <v-col class="py-0 d-flex flex-grow-0">
            <v-btn
              v-if="item.details && item.details.length"
              variant="text"
              :icon="item.expanded ? mdiChevronUp : mdiChevronDown"
              size="small"
              @click="item.expanded = !item.expanded" />
            <div>
              <v-btn
                variant="text"
                class="fill-height"
                rounded
                @click="item.hide = true">
                {{ t('close') }}
              </v-btn>
            </div>
          </v-col>
          <v-col
            v-if="item.expanded && item.details && item.details.length"
            cols="12">
            <span class="pre-wrap">{{ item.details }}</span>
          </v-col>
        </v-row>
      </v-snackbar>
    </template>
    -->
</template>

<script setup lang="ts">
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../../../stores';

const { t } = useI18n();
const appStore = useAppStore();
const { snackbarMessagesQueue } = storeToRefs(appStore);
</script>

<i18n lang="yaml">
en:
  close: Close
fr:
  close: Fermer
</i18n>
