<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('dialogs.title') }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-btn-action
              @click="itemOpen">
              {{ t('dialogs.open') }}
            </v-btn-action>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <dialog-test
      ref="dialogTest"
      not-persistent />
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import { usePage } from '@amilochau/core-vue3/composition';
import DialogTest from '../components/dialogs/DialogTest.vue';

const { t } = useI18n();
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
  },
  footer: {
    items: [
      {
        title: 'GitHub',
        link: 'https://github.com/amilochau/core-vue3',
      },
    ],
  },
})));

const dialogTest = ref<InstanceType<typeof DialogTest>>();
const itemOpen = () => {
  dialogTest.value?.open({
    name : '',
    desc : '',
  });
};
</script>

<i18n lang="yaml">
en:
  pageTitle: Dialogs
  pageDescription: Dialogs test page
fr:
  pageTitle: Dialogs
  pageDescription: Page de test de dialogs
</i18n>

<i18n lang="yaml">
en:
  dialogs:
    title: Dialogs
    open: Open
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
fr:
  dialogs:
    title: Dialogs
    open: Ouvrir
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
</i18n>
