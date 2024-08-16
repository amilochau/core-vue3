<template>
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('login'),
      icon: mdiAccountLockOpen,
      onClick: login,
      color: 'primary',
    }"
    :links="links">
    <v-alert
      v-if="route.query.email"
      border="start"
      type="info"
      variant="tonal"
      class="mb-3">
      {{ t('description') }}
    </v-alert>
    <v-card-text>
      <card-section-title
        :icon="mdiAccountLockOutline"
        :title="t('loginSection.title')" />
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
        autocomplete="current-password"
        type="password"
        required />
    </v-card-text>
  </app-responsive-form>
</template>

<script setup lang="ts">
import { AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/components';
import { mdiAccountLockOpen, mdiAccountLockOutline, mdiAccountPlusOutline, mdiAt, mdiLock, mdiLockReset } from '@mdi/js';
import { useCognito } from '../composition';
import { useI18n } from 'vue-i18n';
import { type Ref, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Login } from '../types';
import { useHandle, useNavigation, usePage, useValidationRules } from '@amilochau/core-vue3/composition';
import { useAppStore } from '@amilochau/core-vue3/stores';

const { t } = useI18n();
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Home' },
  },
})));
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
const { handleLoadAndError } = useHandle();
const { authenticateUser, fetchUserAttributes } = useCognito();
const { required, minLength, maxLength, emailAddress } = useValidationRules();
const { returnUrlQuery } = useNavigation();

const request: Ref<Login> = ref({
  email: route.query.email?.toString() || '',
  password: '',
});

const links = computed(() => ([
  { title: t('links.register.title'), subtitle: t('links.register.subtitle'), prependIcon: mdiAccountPlusOutline, to: { name: 'Register', query: returnUrlQuery.value } },
  { title: t('links.forgotPassword.title'), subtitle: t('links.forgotPassword.subtitle'), prependIcon: mdiLockReset, to: { name: 'ForgotPassword', query: returnUrlQuery.value } },
]));

const login = () => handleLoadAndError(async () => {
  const authenticationResult = await authenticateUser(request.value);
  if (!authenticationResult.success) {
    switch (authenticationResult.nextStep) {
    case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
      await router.push({ name: 'SetPassword', query: { email: request.value.email, ...returnUrlQuery.value } });
      break;
    case 'RESET_PASSWORD':
      await router.push({ name: 'ResetPassword', query: { email: request.value.email, ...returnUrlQuery.value } });
      break;
    default:
      appStore.displayErrorMessage({ title: t('errorMessage') });
    }
  } else {
    await fetchUserAttributes();
    appStore.displayInfoMessage({ title: t('successMessage') });
    if (route.query.returnUrl) {
      await router.replace(route.query.returnUrl.toString());
    } else {
      await router.replace({ name: 'Home' });
    }
  }
});
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
  description: 'Last step: you can now login!'
  loginSection:
    title: Login data
  email: Your email address
  password: Your password
  login: Login
  successMessage: Welcome!
  errorMessage: An error occurred. You can try again later.
  links:
    register:
      title: Register
      subtitle: No account yet? Create yours in a few steps!
    forgotPassword:
      title: Reset password
      subtitle: Forgot your password? Define a new one!
fr:
  title: Connexion
  description: 'Dernière étape : vous pouvez désormais vous connecter !'
  loginSection:
    title: Données de connexion
  email: Votre adresse email
  password: Votre mot de passe
  login: Se connecter
  successMessage: Bienvenue !
  errorMessage: Une erreur est survenue. Vous pouvez réessayer plus tard.
  links:
    register:
      title: S'inscrire
      subtitle: Pas encore de compte ? Créez-en un nouveau en seulement quelques étapes !
    forgotPassword:
      title: Réinitialiser le mot de passe
      subtitle: Vous avez oublié votre mot de passe ? Créez-en un nouveau !
</i18n>
