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
        <span>{{ t('title') }}</span>
      </v-tooltip>
    </template>
    <v-card min-width="240px">
      <v-list
        :items="menuItems"
        density="comfortable"
        item-props
        nav />
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { mdiAccountCircle, mdiCardAccountMail, mdiFaceMan, mdiPower } from '@mdi/js'
import { mergeProps } from 'vue'
import { useI18n } from 'vue-i18n';
import { useClean, useMsal } from '../../../../composition';

const { t } = useI18n()
const { accountInfo, logout } = useMsal()
const { clean } = useClean()

const cleanAndLogout = () => {
  clean();
  logout();
}

const menuItems = [
  { title: accountInfo.value.name, subtitle: accountInfo.value.email, prependIcon: mdiFaceMan },
  { type: 'divider' },
  { title: t('manageProfile'), prependIcon: mdiCardAccountMail, to: { name: 'Profile' } },
  { title: t('logout'), prependIcon: mdiPower, onClick: cleanAndLogout }
]
</script>

<i18n lang="json">
  {
    "en": {
      "title": "Profile",
      "manageProfile": "Manage your profile",
      "logout": "Logout"
    },
    "fr": {
      "title": "Profil",
      "manageProfile": "Gérer your profil",
      "logout": "Déconnexion"
    }
  }
</i18n>
