<template>
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('login'),
      icon: mdiAccountLockOpen,
      onClick: login,
      color: 'primary',
    }"
    :links="links"
    :header="{
      title: t('pageTitle'),
      buttonMode: 'back',
      defaultBackTo: { name: 'Home' }
    }">
    <v-card-text>
      <card-section-title
        :icon="mdiAccountLockOutline"
        :title="t('loginSection.title')" />
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
  </app-responsive-form>
</template>

<script setup lang="ts">
import { AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/src/components';
import { mdiAccountLockOutline, mdiAccountLockOpen, mdiAt, mdiLock, mdiAccountPlusOutline, mdiLockReset } from '@mdi/js';
import { useCognito } from '../composition';
import { useI18n } from 'vue-i18n';
import { computed, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Login } from '../types';
import { useAppStore, useHandle, useNavigation, usePage, useValidationRules } from '@amilochau/core-vue3';

usePage()
const { t } = useI18n()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const { handleLoadAndError } = useHandle()
const { authenticateUser, fetchUserAttributes } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()
const { goBack } = useNavigation()

const request: Ref<Login> = ref({
  email: route.query.email?.toString() || '',
  password: '',
})

const links = computed(() => ([
  { title: t('links.register.title'), subtitle: t('links.register.subtitle'), prependIcon: mdiAccountPlusOutline, to: { name: 'Register' } },
  { title: t('links.forgotPassword.title'), subtitle: t('links.forgotPassword.subtitle'), prependIcon: mdiLockReset, to: { name: 'ForgotPassword' } },
]))

const login = () => handleLoadAndError(async () => {
  await authenticateUser(request.value)
  fetchUserAttributes()
  appStore.displayInfoMessage(t('successMessage'), undefined, 'snackbar')
  if (route.query.returnUrl) {
    await router.replace(route.query.returnUrl.toString())
  } else {
    await goBack({ name: 'Home' })
  }
}, 'snackbar')
</script>

<i18n lang="yaml">
en:
  pageTitle: Login
  pageDescription: Login page
fr:
  pageTitle: Connexion
  pageDescription: Page de connexion
</i18n>

<i18n lang="yaml">
en:
  title: Login
  loginSection:
    title: Login data
  email: Your email address
  password: Your password
  login: Login
  successMessage: Welcome!
  links:
    register:
      title: Register
      subtitle: No account yet? Create yours in a few steps!
    forgotPassword:
      title: Reset password
      subtitle: Forgot your password? Define a new one!
fr:
  title: Connexion
  loginSection:
    title: Données de connexion
  email: Votre adresse email
  password: Votre mot de passe
  login: Se connecter
  successMessage: Bienvenue !
  links:
    register:
      title: S'inscrire
      subtitle: Pas encore de compte ? Créez-en un nouveau en seulement quelques étapes !
    forgotPassword:
      title: Réinitialiser le mot de passe
      subtitle: Vous avez oublié votre mot de passe ? Créez-en un nouveau !
</i18n>
