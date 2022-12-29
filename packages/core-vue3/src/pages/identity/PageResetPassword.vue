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
              <v-text-field
                v-model="request.code"
                :label="t('code')"
                :prepend-icon="mdiNumeric"
                :rules="[ required(), minLength(6), maxLength(200) ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                required />
            </v-card-text>
            <v-card-text class="text-center">
              <v-btn
                :disabled="loading || !online"
                :loading="loading"
                :prepend-icon="mdiLockReset"
                color="primary"
                variant="text"
                @click="reset">
                {{ t('reset') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiLockReset, mdiAt, mdiLock, mdiNumeric } from '@mdi/js';
import { useCognito, usePage, useValidationRules } from '../../composition';
import { useAppStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { Ref, ref, watch } from 'vue';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import { useRoute, useRouter } from 'vue-router';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const router = useRouter()
const route = useRoute()
const { userPoolData } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<any> = ref({})

// INIT & RELOAD PAGE (navigation)
request.value.email = route.query.email
watch(() => route.query.email, () => {
  if (route.query.email) {
    request.value.email = route.query.email
  }
})

async function reset() {
  const { valid } = await form.value!.validate()
  if (!valid) {
    return;
  }

  const userPool = new CognitoUserPool(userPoolData);
  const user = new CognitoUser({ Username: request.value.email, Pool: userPool })
  user.confirmPassword(request.value.code, request.value.password, {
    onFailure: (error) => {
      appStore.displayErrorMessage(t('errorMessage'), error.message || JSON.stringify(error))
    },
    onSuccess: (result) => {
      appStore.displayInfoMessage(t('successMessage'), t('successDetails'))
      router.push({ name: 'Login', query: { email: request.value.email } })
    }
  })
}

</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Reset password",
      "pageDescription": "Password reset page"
    },
    "fr": {
      "pageTitle": "Réinitialisation de mot de passe",
      "pageDescription": "Page de réinitialisation de mot de passe"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Reset password",
      "email": "Your email address",
      "password": "Your password",
      "confirmationPassword": "Your password, again",
      "code": "Your verification code",
      "reset": "Reset password",
      "errorMessage": "An error occured.",
      "successMessage": "Your new password has been set!"
    },
    "fr": {
      "title": "Réinitialisation de mot de passe",
      "email": "Votre adresse email",
      "password": "Votre mot de passe",
      "confirmationPassword": "Votre mot de passe, encore",
      "code": "Votre code de vérification",
      "reset": "Réinitialiser le mot de passe",
      "errorMessage": "Une erreur est survenue.",
      "successMessage": "Votre nouveau mot de passe a été enregistré !"
    }
  }
</i18n>
