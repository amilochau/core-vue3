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
                v-model="request.name"
                :label="t('name')"
                :prepend-icon="mdiAccount"
                :rules="[ required(), maxLength(200) ]"
                variant="underlined"
                density="comfortable"
                hide-details="auto"
                class="mb-3"
                autocomplete="name"
                type="text"
                required />
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
                autocomplete="new-password"
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
                autocomplete="new-password"
                type="password"
                required />
            </v-card-text>
            <v-card-text class="text-center">
              <v-btn
                :disabled="loading || !online"
                :loading="loading"
                :prepend-icon="mdiAccountPlus"
                color="primary"
                variant="text"
                @click="register">
                {{ t('register') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-form>
        <h4 class="mb-4 text-body-2 font-italic text-center">
          {{ t('loginTitle') }}
          <v-btn
            :to="{ name: 'Login' }"
            density="compact"
            variant="text"
            class="ml-1">
            {{ t('loginLink') }}
          </v-btn>
        </h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { mdiAccountPlus, mdiAccount, mdiAt, mdiLock } from '@mdi/js';
import { useCognito, useHandle, usePage, useValidationRules } from '../../composition';
import { useAppStore } from '../../stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Register } from '../../types';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const online = useOnline()
const router = useRouter()
const { handleLoadAndError, handleFormValidation } = useHandle()
const { signUp } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const { loading } = storeToRefs(appStore)

const form: Ref<any> = ref(null)
const request: Ref<Register> = ref({
  name: '',
  email: '',
  password: '',
  confirmationPassword: ''
})

async function register() {
  if (!await handleFormValidation(form)) {
    return
  }

  await handleLoadAndError(async () => {
    const result = await signUp(request.value)
    appStore.displayInfoMessage(t('successMessage'), t('successDetails'), 'snackbar')
    router.push({ name: 'ConfirmEmail', query: { email: result?.user.getUsername() } })
  }, 'snackbar')
}
</script>

<i18n lang="json">
  {
    "en": {
      "pageTitle": "Register",
      "pageDescription": "Register page"
    },
    "fr": {
      "pageTitle": "Création de compte",
      "pageDescription": "Page de création de compte"
    }
  }
</i18n>
<i18n lang="json">
  {
    "en": {
      "title": "Register",
      "name": "Your name",
      "email": "Your email address",
      "password": "Your password",
      "confirmationPassword": "Your password, again",
      "register": "Create account",
      "successMessage": "Your account has now been created!",
      "successDetails": "You must confirm your email address - a code has been sent to you. Check your spams if you don't find it!",
      "loginTitle": "You already have an account?",
      "loginLink": "Login"
    },
    "fr": {
      "title": "Création de compte",
      "name": "Votre nom",
      "email": "Votre adresse email",
      "password": "Votre mot de passe",
      "confirmationPassword": "Votre mot de passe, encore",
      "register": "Créer le compte",
      "successMessage": "Votre compte a bien été créé !",
      "successDetails": "Vous devez désormais confirmer votre addresse email - un code vous a été envoyé. Vérifiez vos spams si vous ne le trouvez pas !",
      "loginTitle": "Vous avez déjà un compte ?",
      "loginLink": "Se connecter"
    }
  }
</i18n>
