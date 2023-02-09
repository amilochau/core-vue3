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
import { useCognito, usePage, useValidationRules } from '../../composition';
import { useAppStore, useIdentityStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Login } from '../../types';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const route = useRoute()
const router = useRouter()
const identityStore = useIdentityStore()
const { authenticateUser, fetchUserAttributes } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<Login> = ref({
  email: route.query.email?.toString() || '',
  password: '',
})

async function login() {
  const { valid } = await form.value!.validate()
  if (!valid) {
    return;
  }

  try {
    await authenticateUser(request.value)
    identityStore.isAuthenticated = true
    fetchUserAttributes()
    appStore.displayInfoMessage(t('successMessage'))
    router.push({ name: 'Home' })
  } catch (error) {
    appStore.displayErrorMessage(t('errorMessage'), error)
  }
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
      "errorMessage": "An error occured.",
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
      "errorMessage": "Une erreur est survenue.",
      "successMessage": "Bienvenue !",
      "registerTitle": "Vous n'avez pas encore de compte ?",
      "registerLink": "S'inscrire",
      "forgotPasswordTitle": "Vous avez oublié votre mot de passe ?",
      "forgotPasswordLink": "Réinitialiser"
    }
  }
</i18n>
