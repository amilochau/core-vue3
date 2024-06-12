<template>
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('reset'),
      icon: mdiLockReset,
      onClick: reset,
      color: 'primary',
    }">
    <v-alert
      border="start"
      type="info"
      variant="tonal"
      class="mb-3">
      {{ t('description') }}
    </v-alert>
    <v-alert
      border="start"
      type="warning"
      variant="tonal"
      class="mb-3">
      {{ t('spam') }}
    </v-alert>
    <v-card-text>
      <card-section-title
        :icon="mdiLockOutline"
        :title="t('resetPasswordSection.title')" />
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
      <v-text-field
        v-model="request.code"
        :label="t('code')"
        :prepend-icon="mdiNumeric"
        :rules="[ required(), minLength(6), maxLength(200) ]"
        autocomplete="one-time-code"
        required />
    </v-card-text>
  </app-responsive-form>
</template>

<script setup lang="ts">
import { AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/components';
import { mdiAt, mdiLock, mdiLockOutline, mdiLockReset, mdiNumeric } from '@mdi/js';
import { useCognito } from '../composition';
import { useI18n } from 'vue-i18n';
import { type Ref, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ResetPassword } from '../types';
import { useHandle, usePage, useValidationRules } from '@amilochau/core-vue3/composition';
import { useAppStore } from '@amilochau/core-vue3/stores';

const { t } = useI18n();
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'ForgotPassword' },
  },
})));
const appStore = useAppStore();
const router = useRouter();
const route = useRoute();
const { handleLoadAndError } = useHandle();
const { confirmPassword } = useCognito();
const { required, minLength, maxLength, emailAddress } = useValidationRules();

const request: Ref<ResetPassword> = ref({
  email: route.query.email?.toString() || '',
  password: '',
  confirmationPassword: '',
  code: '',
});

const reset = () => handleLoadAndError(async () => {
  await confirmPassword(request.value);
  appStore.displayInfoMessage({ title: t('successMessage') });
  await router.replace({ name: 'Login', query: { email: request.value.email } });
});
</script>

<i18n lang="yaml">
en:
  pageTitle: Reset password
  pageDescription: Password reset page
fr:
  pageTitle: Réinitialisation de mot de passe
  pageDescription: Page de réinitialisation de mot de passe
</i18n>

<i18n lang="yaml">
en:
  title: Reset password
  description: We just sent an email to you, with a code. You can now enter this code here to define a new password.
  spam: If you didn't receive this email, you can check your spam folder. Please also check that you didn't make a mistake in your email address!
  resetPasswordSection:
    title: Login data
  email: Your email address
  password: Your new password
  confirmationPassword: Your new password, again
  code: Your verification code
  reset: Reset password
  successMessage: Your new password has been set!
fr:
  title: Réinitialisation de mot de passe
  description: Nous venons de vous envoyer un email, avec un code. Vous pouvez désormais entrer ce code ici pour réinitialiser votre mot de passe.
  spam: Si vous n'avez pas reçu l'email, vous pouvez vérifier dans votre dossier de spams. Vous pouvez également vérifier que vous n'avez pas fait d'erreur dans votre adresse email !
  resetPasswordSection:
    title: Données de connexion
  email: Votre adresse email
  password: Votre mot de passe
  confirmationPassword: Votre mot de passe, encore
  code: Votre code de vérification
  reset: Réinitialiser le mot de passe
  successMessage: Votre nouveau mot de passe a été enregistré !
</i18n>
