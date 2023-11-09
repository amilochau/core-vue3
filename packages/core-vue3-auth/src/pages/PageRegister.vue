<template>
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('register'),
      icon: mdiAccountPlus,
      onClick: register,
      color: 'primary',
    }"
    :links="links">
    <v-card-text>
      <card-section-title
        :icon="mdiAccountPlusOutline"
        :title="t('registerSection.title')" />
      <v-text-field
        v-model="request.name"
        :label="t('name')"
        :prepend-icon="mdiAccount"
        :rules="[ required(), maxLength(200) ]"
        autocomplete="name"
        type="text"
        required />
      <v-text-field
        v-model="request.email"
        :label="t('email')"
        :prepend-icon="mdiAt"
        :rules="[ required(), maxLength(200), emailAddress() ]"
        autocomplete="email"
        type="email"
        inputmode="email"
        required />
      <v-text-field
        v-model="request.password"
        :label="t('password')"
        :prepend-icon="mdiLock"
        :rules="[ required(), minLength(6), maxLength(200) ]"
        autocomplete="new-password"
        type="password"
        required />
      <v-text-field
        v-model="request.confirmationPassword"
        :label="t('confirmationPassword')"
        :prepend-icon="mdiLock"
        :rules="[ required(), minLength(6), maxLength(200) ]"
        autocomplete="new-password"
        type="password"
        required />
    </v-card-text>
  </app-responsive-form>
</template>

<script setup lang="ts">
import { AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/components';
import { mdiAccount, mdiAccountLockOutline, mdiAccountPlus, mdiAccountPlusOutline, mdiAt, mdiLock } from '@mdi/js';
import { useCognito } from '../composition';
import { useI18n } from 'vue-i18n';
import { type Ref, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Register } from '../types';
import { useHandle, usePage, useValidationRules } from '@amilochau/core-vue3/composition';
import { useAppStore } from '@amilochau/core-vue3/stores';

const { t } = useI18n()
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Home' },
  }
})))
const appStore = useAppStore()
const router = useRouter()
const { handleLoadAndError } = useHandle()
const { signUp } = useCognito()
const { required, minLength, maxLength, emailAddress } = useValidationRules()

const request: Ref<Register> = ref({
  name: '',
  email: '',
  password: '',
  confirmationPassword: ''
})

const links = computed(() => ([
  { title: t('links.login.title'), subtitle: t('links.login.subtitle'), prependIcon: mdiAccountLockOutline, to: { name: 'Login' } },
]))

const register = () => handleLoadAndError(async () => {
  const result = await signUp(request.value)
  appStore.displayInfoMessage(t('successMessage'), t('successDetails'), 'snackbar')
  await router.push({ name: 'ConfirmEmail', query: { email: result?.user.getUsername() } })
}, 'snackbar')
</script>

<i18n lang="yaml">
en:
  pageTitle: Register
  pageDescription: Register page
fr:
  pageTitle: Création de compte
  pageDescription: Page de création de compte
</i18n>

<i18n lang="yaml">
en:
  title: Register
  registerSection:
    title: Account data
  name: Your name
  email: Your email address
  password: Your password
  confirmationPassword: Your password, again
  register: Create account
  successMessage: Your account has now been created!
  successDetails: You must confirm your email address - a code has been sent to you.
    Check your spams if you don't find it!
  links:
    login:
      title: Login
      subtitle: Already have an account? Login with your credentials!
fr:
  title: Création de compte
  registerSection:
    title: Données de compte
  name: Votre nom
  email: Votre adresse email
  password: Votre mot de passe
  confirmationPassword: Votre mot de passe, encore
  register: Créer le compte
  successMessage: Votre compte a bien été créé !
  successDetails: Vous devez désormais confirmer votre addresse email - un code vous
    a été envoyé. Vérifiez vos spams si vous ne le trouvez pas !
  links:
    login:
      title: Se connecter
      subtitle: Vous avez déjà un compte ? Connectez-vous avec vos identifiants !
</i18n>
