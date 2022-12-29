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
                v-model="request.oldPassword"
                :label="t('oldPassword')"
                :prepend-icon="mdiLockClock"
                :rules="[ required(), minLength(6), maxLength(200) ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                type="password"
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
              <v-text-field
                v-model="request.confirmationPassword"
                :label="t('confirmationPassword')"
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
                :prepend-icon="mdiLockReset"
                color="warning"
                variant="text"
                @click="editPassword">
                {{ t('editPassword') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiLockReset, mdiLockClock, mdiLock } from '@mdi/js';
import { useCognito, usePage, useValidationRules } from '../../composition';
import { useAppStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { Ref, ref } from 'vue';
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { useRouter } from 'vue-router';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const router = useRouter()
const { userPoolData } = useCognito()
const { required, minLength, maxLength } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<any> = ref({})

async function editPassword() {
  var validationResult = await form.value!.validate()
  if (!validationResult.valid) {
    return;
  }

  const userPool = new CognitoUserPool(userPoolData);
  const currentUser = userPool.getCurrentUser()
  currentUser?.getSession((error) => {
    if (error) {
      appStore.displayErrorMessage(t('errorMessage'), error.message || JSON.stringify(error))
      return
    }

    currentUser?.changePassword(request.value.oldPassword, request.value.password, (error, result) => {
      if (error) {
        appStore.displayErrorMessage(t('errorMessage'), error.message || JSON.stringify(error))
        return
      }

      appStore.displayInfoMessage(t('successMessage'))
      router.push({ name: 'Profile' })
    })
  })
}

</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Password change",
      "pageDescription": "Password change page"
    },
    "fr": {
      "pageTitle": "Modification de mot de passe",
      "pageDescription": "Page de modification de mot de passe"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Edit password",
      "oldPassword": "Your old password",
      "password": "Your new password",
      "confirmationPassword": "Your new password, again",
      "editPassword": "Edit password",
      "errorMessage": "An error occured.",
      "successMessage": "Your password has been changed!"
    },
    "fr": {
      "title": "Modification de mot de passe",
      "oldPassword": "Votre ancien mot de passe",
      "password": "Votre nouveau mot de passe",
      "confirmationPassword": "Votre nouveau mot de passe, encore",
      "editPassword": "Modifier le mot de passe",
      "errorMessage": "Une erreur est survenue.",
      "successMessage": "Votre mot de passe a bien été changé !"
    }
  }
</i18n>
