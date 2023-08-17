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
        color="primary"
        item-props
        nav />
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { mdiAccountCircle, mdiCardAccountMail, mdiFaceMan, mdiPower } from '@mdi/js'
import { storeToRefs } from 'pinia';
import { computed, mergeProps } from 'vue'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useClean } from '../../../../composition';
import { useAppStore, useIdentityStore } from '../../../../stores';

const { t } = useI18n()
const { clean } = useClean()
const router = useRouter()
const identityStore = useIdentityStore()
const appStore = useAppStore()

const { attributes } = storeToRefs(identityStore)

const cleanAndLogout = async () => {
  try {
    appStore.loading = true
    await identityStore.logout();
    clean();
    await router.push({ name: 'Home' })
  } finally {
    appStore.loading = false
  }
}

const menuItems = computed(() => [
  { title: attributes.value.name, subtitle: attributes.value.email, prependIcon: mdiFaceMan },
  { type: 'divider' },
  { title: t('manageProfile'), prependIcon: mdiCardAccountMail, to: { name: 'Profile' } },
  { title: t('logout'), prependIcon: mdiPower, onClick: cleanAndLogout }
])
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
