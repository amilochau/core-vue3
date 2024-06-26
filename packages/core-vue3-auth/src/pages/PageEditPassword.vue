<template>
  <app-responsive-form
    :title="t('title')"
    :button="{
      title: t('editPassword'),
      icon: mdiLockReset,
      onClick: editPassword,
      color: 'warning',
    }">
    <v-card-text>
      <card-section-title
        :icon="mdiLockOutline"
        :title="t('passwordSection.title')" />
      <v-text-field
        v-model="request.oldPassword"
        :label="t('oldPassword')"
        :prepend-icon="mdiLockClock"
        :rules="[ required(), minLength(6), maxLength(200) ]"
        autocomplete="current-password"
        type="password"
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
import { mdiLock, mdiLockClock, mdiLockOutline, mdiLockReset } from '@mdi/js';
import { useCognito } from '../composition';
import { useI18n } from 'vue-i18n';
import { type Ref, computed, ref } from 'vue';
import type { EditPassword } from '../types';
import { useAppStore } from '@amilochau/core-vue3/stores';
import { useHandle, useNavigation, usePage, useValidationRules } from '@amilochau/core-vue3/composition';

const { t } = useI18n();
usePage(computed(() => ({
  title: t('pageTitle'),
  description: t('pageDescription'),
  header: {
    buttonMode: 'back',
    defaultBackTo: { name: 'Profile' },
  },
})));
const appStore = useAppStore();
const { handleLoadAndError } = useHandle();
const { changePassword } = useCognito();
const { required, minLength, maxLength } = useValidationRules();
const { goBack } = useNavigation();

const request: Ref<EditPassword> = ref({
  oldPassword: '',
  password: '',
  confirmationPassword: '',
});

const editPassword = () => handleLoadAndError(async () => {
  await changePassword(request.value);
  appStore.displayInfoMessage({ title: t('successMessage') });
  await goBack({ name: 'Profile' });
});
</script>

<i18n lang="yaml">
en:
  pageTitle: Password change
  pageDescription: Password change page
fr:
  pageTitle: Modification de mot de passe
  pageDescription: Page de modification de mot de passe
</i18n>

<i18n lang="yaml">
en:
  title: Edit password
  passwordSection:
    title: Login data
  oldPassword: Your old password
  password: Your new password
  confirmationPassword: Your new password, again
  editPassword: Edit password
  successMessage: Your password has been changed!
fr:
  title: Modification de mot de passe
  passwordSection:
    title: Données de connexion
  oldPassword: Votre ancien mot de passe
  password: Votre nouveau mot de passe
  confirmationPassword: Votre nouveau mot de passe, encore
  editPassword: Modifier le mot de passe
  successMessage: Votre mot de passe a bien été changé !
</i18n>
