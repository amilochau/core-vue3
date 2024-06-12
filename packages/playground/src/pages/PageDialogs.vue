<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6">
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('dialogs.items') }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            {{ t('model', { model: items }) }}
          </v-card-text>
          <v-card-text>
            <v-btn-action
              @click="dialogListItemCreate?.open()">
              {{ t('dialogs.createItem') }}
            </v-btn-action>
            <v-btn-action
              v-if="items.length"
              @click="dialogListItemEdit?.open(items[0].name)">
              {{ t('dialogs.editItem') }}
            </v-btn-action>
            <v-btn-action
              v-if="items.length"
              @click="dialogListItemDelete?.open(items[0].name)">
              {{ t('dialogs.deleteItem') }}
            </v-btn-action>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-item>
            <v-card-title>
              {{ t('dialogs.records') }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            {{ t('model', { model: item }) }}
          </v-card-text>
          <v-card-text>
            <v-btn-action
              @click="dialogRecordCreate?.open()">
              {{ t('dialogs.createRecord') }}
            </v-btn-action>
            <v-btn-action
              v-if="Object.keys(item.records).length"
              @click="dialogRecordEdit?.open(Object.keys(item.records)[0])">
              {{ t('dialogs.editRecord') }}
            </v-btn-action>
            <v-btn-action
              v-if="Object.keys(item.records).length"
              @click="dialogRecordDelete?.open(Object.keys(item.records)[0])">
              {{ t('dialogs.deleteRecord') }}
            </v-btn-action>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <dialog-list-item-create
      ref="dialogListItemCreate"
      v-model:items="items" />
    <dialog-list-item-edit
      ref="dialogListItemEdit"
      v-model:items="items" />
    <dialog-list-item-delete
      ref="dialogListItemDelete"
      v-model:items="items" />

    <dialog-record-create
      ref="dialogRecordCreate"
      v-model:item="item" />
    <dialog-record-edit
      ref="dialogRecordEdit"
      v-model:item="item" />
    <dialog-record-delete
      ref="dialogRecordDelete"
      v-model:item="item" />
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import { usePage } from '@amilochau/core-vue3/composition';
import DialogListItemCreate from '../components/dialogs/DialogListItemCreate.vue';
import DialogListItemEdit from '../components/dialogs/DialogListItemEdit.vue';
import DialogListItemDelete from '../components/dialogs/DialogListItemDelete.vue';
import DialogRecordCreate from '../components/dialogs/DialogRecordCreate.vue';
import DialogRecordEdit from '../components/dialogs/DialogRecordEdit.vue';
import DialogRecordDelete from '../components/dialogs/DialogRecordDelete.vue';
import type { Item } from '@/types/test';

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

const dialogRecordCreate = ref<InstanceType<typeof DialogRecordCreate>>();
const dialogRecordEdit = ref<InstanceType<typeof DialogRecordEdit>>();
const dialogRecordDelete = ref<InstanceType<typeof DialogRecordDelete>>();
const dialogListItemCreate = ref<InstanceType<typeof DialogListItemCreate>>();
const dialogListItemEdit = ref<InstanceType<typeof DialogListItemEdit>>();
const dialogListItemDelete = ref<InstanceType<typeof DialogListItemDelete>>();
const item = ref<Item>({ name: 'zzd', desc: '', records: {} });
const items = ref<Item[]>([]);
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
    records: Records
    createRecord: Create record
    editRecord: Edit record
    deleteRecord: Delete record
    items: Items
    createItem: Create item
    editItem: Edit item
    deleteItem: Delete item
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
  model: "Model: {model}"
fr:
  dialogs:
    records: Records
    createRecord: Create record
    editRecord: Edit record
    deleteRecord: Delete record
    items: Items
    createItem: Create item
    editItem: Edit item
    deleteItem: Delete item
  longText: |
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed,
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  text1: Text 1
  text2: Text 2
  model: "Model: {model}"
</i18n>
