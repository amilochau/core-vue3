<template>
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('set'),
      icon: mdiLockReset,
      onClick: set,
      color: 'primary',
    }">
    <v-alert
      border="start"
      type="info"
      variant="tonal"
      class="mb-3">
      {{ t('description') }}
    </v-alert>
    <v-card-text>
      <card-section-title
        :icon="mdiLockOutline"
        :title="t('setPasswordSection.title')" />
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
import { mdiAt, mdiLock, mdiLockOutline, mdiLockReset } from '@mdi/js';
import { useCognito } from '../composition';
import { useI18n } from 'vue-i18n';
import { type Ref, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { SetPassword } from '../types';
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
const { confirmLogin } = useCognito();
const { required, minLength, maxLength, emailAddress } = useValidationRules();

const request: Ref<SetPassword> = ref({
  email: route.query.email?.toString() || '',
  password: '',
  confirmationPassword: '',
});

const set = () => handleLoadAndError(async () => {
  const authenticationResult = await confirmLogin(request.value);
  if (!authenticationResult.success) {
    appStore.displayErrorMessage({ title: t('errorMessage') });
  } else {
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
  pageTitle: Set password
  pageDescription: New password page
fr:
  pageTitle: Modification de mot de passe
  pageDescription: Page de modification de mot de passe
</i18n>

<i18n lang="yaml">
en:
  title: Set new password
  description: Your password must be changed. Set here a new one.
  setPasswordSection:
    title: Login data
  email: Your email address
  password: Your new password
  confirmationPassword: Your new password, again
  set: Set password
  successMessage: Your new password has been set!
  errorMessage: An error occurred. You can try again later.
fr:
  title: Nouveau mot de passe
  description: Votre mot de passe doit être modifié. Vous devez en indiquer un nouveau ici.
  setPasswordSection:
    title: Données de connexion
  email: Votre adresse email
  password: Votre mot de passe
  confirmationPassword: Votre mot de passe, encore
  set: Modifier le mot de passe
  successMessage: Votre nouveau mot de passe a été enregistré !
  errorMessage: Une erreur est survenue. Vous pouvez réessayer plus tard.
</i18n>
