<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('longText') }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <p>{{ t('longText') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-switch
          v-model="boolValue"
          :label="t('text1')" />
        <v-switch
          v-model="boolValue"
          :label="t('text2')"
          color="warning" />
      </v-col>
      <v-col cols="6">
        <v-text-field
          :label="t('text1')" />
        <v-text-field
          :label="t('text2')"
          variant="outlined" />
      </v-col>
      <v-col cols="6">
        <v-textarea
          :label="t('text1')" />
        <v-textarea
          :label="t('text2')" />
      </v-col>
      <v-col cols="6">
        <v-timeline>
          <v-timeline-item>
            {{ t('text1') }}
          </v-timeline-item>
          <v-timeline-item>
            {{ t('text2') }}
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()
const boolValue = ref(true)
</script>


<i18n lang="yaml">
en:
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
fr:
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
</i18n>
