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
          :readonly="loading"
          class="mb-4">
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
                autocomplete="email"
                type="email"
                inputmode="email"
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
                autocomplete="current-password"
                type="password"
                required />
            </v-card-text>
            <v-card-text class="text-center">
              <v-btn
                :disabled="loading || !online"
                :loading="loading"
                :prepend-icon="mdiAccountLockOpen"
                color="primary"
                variant="text"
                @click="login">
                {{ t('login') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-form>
        <h4 class="mb-4 text-body-2 font-italic text-center">
          {{ t('registerTitle') }}
          <v-btn
            :to="{ name: 'Register' }"
            density="compact"
            variant="text"
            class="ml-1">
            {{ t('registerLink') }}
          </v-btn>
        </h4>
        <h4 class="mb-4 text-body-2 font-italic text-center">
          {{ t('forgotPasswordTitle') }}
          <v-btn
            :to="{ name: 'ForgotPassword' }"
            density="compact"
            variant="text"
            class="ml-1">
            {{ t('forgotPasswordLink') }}
          </v-btn>
        </h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiAccountLockOpen, mdiAt, mdiLock } from '@mdi/js';
import { useCognito } from '../composition';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Login } from '../types';
import { useAppStore, useHandle, usePage, useValidationRules } from '@amilochau/core-vue3';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const route = useRoute()
const router = useRouter()
const { handleLoadAndError, handleFormValidation } = useHandle()
const { authenticateUser, fetchUserAttributes } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<Login> = ref({
  email: route.query.email?.toString() || '',
  password: '',
})

async function login() {
  if (!await handleFormValidation(form)) {
    return
  }

  await handleLoadAndError(async () => {
    await authenticateUser(request.value)
    fetchUserAttributes()
    appStore.displayInfoMessage(t('successMessage'), undefined, 'snackbar')
    router.push({ name: 'Home' })
  }, 'snackbar')
}
</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Login",
      "pageDescription": "Login page"
    },
    "fr": {
      "pageTitle": "Connexion",
      "pageDescription": "Page de connexion"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Login",
      "email": "Your email address",
      "password": "Your password",
      "login": "Login",
      "successMessage": "Welcome!",
      "registerTitle": "You don't have any account yet?",
      "registerLink": "Register",
      "forgotPasswordTitle": "You can't remember your password?",
      "forgotPasswordLink": "Reset"
    },
    "fr": {
      "title": "Connexion",
      "email": "Votre adresse email",
      "password": "Votre mot de passe",
      "login": "Se connecter",
      "successMessage": "Bienvenue !",
      "registerTitle": "Vous n'avez pas encore de compte ?",
      "registerLink": "S'inscrire",
      "forgotPasswordTitle": "Vous avez oublié votre mot de passe ?",
      "forgotPasswordLink": "Réinitialiser"
    }
  }
</i18n>
