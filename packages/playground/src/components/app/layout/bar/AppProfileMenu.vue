<template>
  <v-menu
    location="bottom end">
    <template #activator="{ props: menu }">
      <v-tooltip location="start">
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="mergeProps(menu, tooltip)"
            :icon="mdiAccountCircle" />
        </template>
        <span>{{ t('app.header.profile.title') }}</span>
      </v-tooltip>
    </template>
    <v-card min-width="240px">
      <v-list
        :items="menuItems"
        density="comfortable"
        item-props
        nav />
    </v-card>
    <v-btn @click="appStore.clean">CLEAN</v-btn>
  </v-menu>
</template>

<script setup lang="ts">
import { useAppStore } from '@amilochau/core-vue3';
import { mdiAccountCircle, mdiCardAccountMail, mdiFaceMan, mdiPower } from '@mdi/js'
import { getCurrentInstance, mergeProps } from 'vue'
import { useI18n } from 'vue-i18n';
import { useMsal } from '../../../../composition/msal';
import { useMapsStore } from '../../../../stores';

const { t } = useI18n()
const { accountInfo, editProfile, logout } = useMsal()
const appStore = useAppStore()
const mapsStore = useMapsStore()

const menuItems = [
  { title: accountInfo.value.name, subtitle: accountInfo.value.email, prependIcon: mdiFaceMan },
  { type: 'divider' },
  { title: t('app.header.profile.edit'), prependIcon: mdiCardAccountMail, onClick: editProfile },
  { title: t('app.header.profile.logout'), prependIcon: mdiPower, onClick: appStore.clean }
]
</script>
