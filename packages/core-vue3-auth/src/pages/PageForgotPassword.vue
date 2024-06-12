<template>
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('reset'),
      icon: mdiLockReset,
      onClick: reset,
      color: 'primary',
    }">
    <v-card-text>
      <card-section-title
        :icon="mdiLockOutline"
        :title="t('forgotPasswordSection.title')" />
      <v-text-field
        v-model="request.email"
        :label="t('email')"
        :prepend-icon="mdiAt"
        :rules="[ required(), maxLength(200), emailAddress() ]"
        autocomplete="email"
        type="email"
        inputmode="email"
        required />
    </v-card-text>
  </app-responsive-form>
</template>

<script setup lang="ts">
import { AppResponsiveForm, CardSectionTitle } from '@amilochau/core-vue3/components';
import { mdiAt, mdiLockOutline, mdiLockReset } from '@mdi/js';
import { useCognito } from '../composition';
import { useI18n } from 'vue-i18n';
import { type Ref, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { ForgotPassword } from '../types';
import { useAppStore } from '@amilochau/core-vue3/stores';
import { useHandle, usePage, useValidationRules } from '@amilochau/core-vue3/composition';

const { t } = useI18n();
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Login' },
  },
})));
const appStore = useAppStore();
const router = useRouter();
const { handleLoadAndError } = useHandle();
const { forgotPassword } = useCognito();
const { required, maxLength, emailAddress } = useValidationRules();

const request: Ref<ForgotPassword> = ref({
  email: '',
});

const reset = () => handleLoadAndError(async () => {
  await forgotPassword(request.value);
  appStore.displayInfoMessage({ title: t('successMessage'), details: t('successDetails') });
  await router.push({ name: 'ResetPassword', query: { email: request.value.email } });
});
</script>

<i18n lang="yaml">
en:
  pageTitle: Forgot password
  pageDescription: Password forgotten page
fr:
  pageTitle: Mot de passe oublié
  pageDescription: Page de mot de passe oublié
</i18n>

<i18n lang="yaml">
en:
  title: Password forgotten
  forgotPasswordSection:
    title: Login data
  email: Your email address
  reset: Reset password
  successMessage: Your password has been reset!
  successDetails: An email with the reset code has been sent to you. Check your spams
    if you don't find it!
fr:
  title: Mot de passe oublié
  forgotPasswordSection:
    title: Données de connexion
  email: Votre adresse email
  reset: Réinitialiser le mot de passe
  successMessage: Votre mot de passe a été réinitialisé !
  successDetails: Un email avec le code de réinitialisation vous a été envoyé. Vérifiez
    vos spams si vous ne le trouvez pas !
</i18n>
