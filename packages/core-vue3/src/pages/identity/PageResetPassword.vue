<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
        class="text-center">
        <h1 class="my-4 text-h5 text-primary">
          {{ t('title') }}
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6">
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
import { useCognito, useHandle, usePage, useValidationRules } from '../../composition';
import { useAppStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ResetPassword } from '../../types';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const router = useRouter()
const route = useRoute()
const { handleLoadAndError, handleFormValidation } = useHandle()
const { confirmPassword } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<ResetPassword> = ref({
  email: route.query.email?.toString() || '',
  password: '',
  confirmationPassword: '',
  code: '',
})

async function reset() {
  if (!await handleFormValidation(form)) {
    return
  }

  await handleLoadAndError(async () => {
    await confirmPassword(request.value);
    appStore.displayInfoMessage(t('successMessage'), t('successDetails'), 'snackbar')
    router.push({ name: 'Login', query: { email: request.value.email } })
  }, 'snackbar')
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
      "successMessage": "Your new password has been set!"
    },
    "fr": {
      "title": "Réinitialisation de mot de passe",
      "email": "Votre adresse email",
      "password": "Votre mot de passe",
      "confirmationPassword": "Votre mot de passe, encore",
      "code": "Votre code de vérification",
      "reset": "Réinitialiser le mot de passe",
      "successMessage": "Votre nouveau mot de passe a été enregistré !"
    }
  }
</i18n>
