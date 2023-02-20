<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
        class="text-center">
        <h1 class="my-4 text-h5 text-primary">
          {{ t("title") }}
        </h1>
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
            :prepend-icon="mdiAccountEdit"
            :to="{ name: 'EditProfile' }"
            color="primary"
            variant="text">
            {{ t('editProfile') }}
          </v-btn>
          <v-btn
            :disabled="loading || !online"
            :loading="loading"
            :prepend-icon="mdiLockReset"
            :to="{ name: 'EditPassword' }"
            color="warning"
            variant="text">
            {{ t('editPassword') }}
          </v-btn>
          <v-btn
            :disabled="loading || !online"
            :loading="loading"
            :prepend-icon="mdiAccountOff"
            :to="{ name: 'DeleteAccount' }"
            color="error"
            variant="text">
            {{ t('deleteAccount') }}
          </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiAccountOff, mdiAccount, mdiAt, mdiLockReset, mdiAccountEdit } from '@mdi/js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePage } from '../../composition';
import { useAppStore, useIdentityStore } from '../../stores';
import { useOnline } from '@vueuse/core';

usePage()
const { t } = useI18n()
const online = useOnline()
const appStore = useAppStore()
const identityStore = useIdentityStore()

const { loading } = storeToRefs(appStore)
const { attributes } = storeToRefs(identityStore)

const contactItems = computed(() => [{
  title: attributes.value.email,
  props: {
    prependIcon: mdiAt,
  },
}, {
  title: attributes.value.name,
  props: {
    prependIcon: mdiAccount,
  },
}])
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
      "editProfile": "Edit your profile",
      "editPassword": "Edit password",
      "deleteAccount": "Delete account"
    },
    "fr": {
      "title": "Profil",
      "profileDetails": "Détails du profil",
      "editProfile": "Modifier votre profil",
      "editPassword": "Modifier votre mot de passe",
      "deleteAccount": "Supprimer votre compte"
    }
  }
</i18n>
