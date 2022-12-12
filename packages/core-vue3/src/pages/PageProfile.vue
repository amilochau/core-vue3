<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h6 text-center">
          {{ t("title") }}
        </h2>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6">
        <v-card class="h-100">
          <v-card-item>
            <v-card-subtitle>
              {{ t('profileDetails') }}
            </v-card-subtitle>
          </v-card-item>
          <v-list :items="contactItems" />
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6">
        <v-card-text class="text-center">
          <v-btn
            :disabled="loading || !online"
            :loading="loading"
            :prepend-icon="mdiPencil"
            color="primary"
            variant="text"
            @click="editProfile">
            {{ t('editProfile') }}
          </v-btn>
          <v-btn
            :disabled="loading || !online"
            :loading="loading"
            :prepend-icon="mdiLockReset"
            color="warning"
            variant="text"
            @click="editPassword">
            {{ t('editPassword') }}
          </v-btn>
          <v-btn
            :disabled="loading || !online"
            :loading="loading"
            :prepend-icon="mdiAccountOff"
            color="error"
            variant="text"
            @click="deleteAccount">
            {{ t('deleteAccount') }}
          </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiAccountOff, mdiCardAccountMail, mdiEmail, mdiLockReset, mdiPencil } from '@mdi/js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMsal, usePage } from '../composition';
import { useAppStore } from '../stores';
import { useOnline } from '@vueuse/core';

usePage()
const { t } = useI18n()
const { accountInfo, editProfile, editPassword, deleteAccount } = useMsal()
const online = useOnline()
const appStore = useAppStore()

const { loading } = storeToRefs(appStore)

const contactItems = computed(() => ([{
  title: accountInfo.value.name,
  props: {
    prependIcon: mdiCardAccountMail,
  },
}, {
  title: accountInfo.value.email,
  props: {
    prependIcon: mdiEmail,
  },
}]))
</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Profile",
      "pageDescription": "Profile page"
    },
    "fr": {
      "pageTitle": "Profil",
      "pageDescription": "Page de profil"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Profile",
      "profileDetails": "Profile details",
      "editProfile": "Manage your profile",
      "editPassword": "Edit password",
      "deleteAccount": "Delete account"
    },
    "fr": {
      "title": "Profil",
      "profileDetails": "Détails de profil",
      "editProfile": "Gérer votre profil",
      "editPassword": "Modifier votre mot de passe",
      "deleteAccount": "Supprimer votre compte"
    }
  }
</i18n>
