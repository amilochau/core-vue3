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
  <dialog-form
    ref="dialogFormRef"
    :dialog-title="t('title')"
    :dialog-icon="mdiGavel"
    :cancel-title="t('refuse')"
    :save-title="t('accept')"
    :save-icon="mdiCheck"
    not-persistent
    @close="close"
    @save="accept">
    <privacy-card /><!-- @todo Don't add text- -->
  </dialog-form>
</template>

<script setup lang="ts">
import { mdiCheck, mdiCookie, mdiGavel } from '@mdi/js';
import { useI18n } from 'vue-i18n';
import { useCookiesStore } from '../../../stores';
import { ref } from 'vue';
import PrivacyCard from '../content/PrivacyCard.vue';
import DialogForm from '../../dialogs/DialogForm.vue';

const { t } = useI18n();
const cookiesStore = useCookiesStore();

const displayed = ref(cookiesStore.showCookies);

const seePolicy = () => {
  displayed.value = false;
  dialogFormRef.value?.open();
};
const accept = () => {
  displayed.value = false;
  dialogFormRef.value?.open();
  cookiesStore.acceptCookies();
};
const refuse = () => {
  displayed.value = false;
  cookiesStore.refuseCookies();
};

const close = (source: 'title' | 'actions' | 'out' | 'expose') => {
  if (source === 'actions') {
    refuse();
  }
};

const dialogFormRef = ref<InstanceType<typeof DialogForm>>();
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
