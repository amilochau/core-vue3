<template>
  <v-bottom-sheet
    v-model="displayed"
    inset>
    <v-card>
      <v-card-item :title="t('title')">
        <template #prepend>
          <v-icon
            :icon="mdiCookie"
            color="primary" />
        </template>
      </v-card-item>
      <v-card-actions class="flex-wrap justify-center">
        <v-btn-action
          color="info"
          class="mb-2 mx-2"
          variant="text"
          @click="seePolicy">
          {{ t('seePolicy') }}
        </v-btn-action>
        <div>
          <v-btn-action
            color="success"
            class="mb-2"
            @click="accept">
            {{ t('accept') }}
          </v-btn-action>
          <v-btn-action
            color="error"
            class="mb-2"
            @click="refuse">
            {{ t('refuse') }}
          </v-btn-action>
        </div>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
  <dialog-simple
    ref="dialogFormRef"
    :dialog-title="t('title')"
    :dialog-icon="mdiGavel"
    not-persistent>
    <privacy-card />
    <template #actions>
      <v-spacer />
      <v-btn
        variant="text"
        color="grey-lighten-2"
        @click="refuse">
        {{ t('refuse') }}
      </v-btn>
      <v-btn
        :prepend-icon="mdiCheck"
        variant="text"
        @click="accept">
        {{ t('accept') }}
      </v-btn>
    </template>
  </dialog-simple>
</template>

<script setup lang="ts">
import { mdiCheck, mdiCookie, mdiGavel } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import { useCookiesStore } from '../../../stores';
import { ref } from 'vue';
import PrivacyCard from '../content/PrivacyCard.vue';
import DialogSimple from '../../dialogs/DialogSimple.vue';

const { t } = useI18n();
const cookiesStore = useCookiesStore();

const displayed = ref(cookiesStore.showCookies);

const seePolicy = () => {
  displayed.value = false;
  dialogFormRef.value?.open();
};
const accept = () => {
  displayed.value = false;
  cookiesStore.acceptCookies();
};
const refuse = () => {
  displayed.value = false;
  cookiesStore.refuseCookies();
};

const dialogFormRef = ref<InstanceType<typeof DialogSimple>>();
</script>

<i18n lang="yaml">
en:
  title: This website uses cookies to work.
  seePolicy: Read
  accept: Accept
  refuse: Refuse
fr:
  title: Ce site utilise des cookies pour fonctionner.
  seePolicy: En savoir plus
  accept: Accepter
  refuse: Refuser
</i18n>

<i18n lang="yaml">
en:
  title: Privacy
fr:
  title: Confidentialité
</i18n>
