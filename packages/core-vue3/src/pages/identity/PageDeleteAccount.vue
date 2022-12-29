<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6">
        <h2 class="mb-4 text-h6 text-center">
          {{ t('title') }}
        </h2>
        <v-form
          ref="form"
          :readonly="loading">
          <v-card
            elevation="0">
            <v-card-text>
              <v-text-field
                v-model="request.email"
                :label="t('email')"
                :prepend-icon="mdiAt"
                :rules="[ required(), maxLength(200), emailAddress() ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                type="email"
                required />
              <v-text-field
                v-model="request.password"
                :label="t('password')"
                :prepend-icon="mdiLock"
                :rules="[ required(), minLength(6), maxLength(200) ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                type="password"
                required />
            </v-card-text>
            <v-card-text class="text-center">
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
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiAccountOff, mdiAt, mdiLock } from '@mdi/js';
import { useClean, useCognito, usePage, useValidationRules } from '../../composition';
import { useAppStore, useIdentityStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Login } from '../../types';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const { clean } = useClean()
const router = useRouter()
const identityStore = useIdentityStore()
const { authenticateUser, deleteUser } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<Login> = ref({
  email: '',
  password: '',
})

async function deleteAccount() {
  const { valid } = await form.value!.validate()
  if (!valid) {
    return;
  }

  try {
    await authenticateUser(request.value)
    await deleteUser()
  } catch (error) {
    appStore.displayErrorMessage(t('errorMessage'), error)
    identityStore.isAuthenticated = false
    clean();
    appStore.displayInfoMessage(t('successMessage'))
    router.push({ name: 'Home' })
  }
}
</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Account deletion",
      "pageDescription": "Account deletion page"
    },
    "fr": {
      "pageTitle": "Suppression de compte",
      "pageDescription": "Page de suppression de compte"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Delete account",
      "email": "Your email address",
      "password": "Your password",
      "deleteAccount": "Delete account",
      "errorMessage": "An error occured.",
      "successMessage": "Your account has been deleted!"
    },
    "fr": {
      "title": "Suppression de compte",
      "email": "Votre adresse email",
      "password": "Votre mot de passe",
      "deleteAccount": "Supprimer le compte",
      "errorMessage": "Une erreur est survenue.",
      "successMessage": "Votre compte a bien été supprimé !"
    }
  }
</i18n>
