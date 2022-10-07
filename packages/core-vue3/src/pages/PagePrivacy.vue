<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <section>
          <app-section-header>{{ t('pages.privacy.header11') }}</app-section-header>
          <app-section-text>{{ t('pages.privacy.text11', { name: coreOptions.application.name }) }}</app-section-text>
        </section>
        <section>
          <app-section-header>{{ t('pages.privacy.header21') }}</app-section-header>
          <app-section-text>{{ t('pages.privacy.text21', { name: coreOptions.application.name }) }}</app-section-text>
          <app-section-sub-header>{{ t('pages.privacy.header22') }}</app-section-sub-header>
          <app-section-text>{{ t('pages.privacy.text22', { name: coreOptions.application.name }) }}</app-section-text>
          <app-section-sub-header>{{ t('pages.privacy.header23') }}</app-section-sub-header>
          <app-section-text>{{ t('pages.privacy.text23', { name: coreOptions.application.name }) }}</app-section-text>
          <app-section-sub-header>{{ t('pages.privacy.header24') }}</app-section-sub-header>
          <app-section-text>{{ t('pages.privacy.text24') }}</app-section-text>
          <app-section-sub-header>{{ t('pages.privacy.header25') }}</app-section-sub-header>
          <app-section-text>{{ t('pages.privacy.text25', { name: coreOptions.application.name, contact: coreOptions.application.contact }) }}</app-section-text>
          <app-section-sub-header>{{ t('pages.privacy.header26') }}</app-section-sub-header>
          <app-section-text>{{ t('pages.privacy.text26', { name: coreOptions.application.name }) }}</app-section-text>
          <app-section-sub-header>{{ t('pages.privacy.header27') }}</app-section-sub-header>
          <app-section-text>{{ t('pages.privacy.text27', { name: coreOptions.application.name }) }}</app-section-text>
          <app-section-sub-header>{{ t('pages.privacy.header28') }}</app-section-sub-header>
          <app-section-text>{{ t('pages.privacy.text28', { name: coreOptions.application.name }) }}</app-section-text>
        </section>
      </v-col>
    </v-row>
    <v-row class="cookies-bar-margin">
      <v-col>
        <p>
          {{ t('pages.privacy.cookiesAccepted', { accepted: cookiesStore.cookiesAccepted }) }}
        </p>
        <v-btn
          class="bg-success mr-1"
          variant="text"
          @click="cookiesStore.acceptCookies">
          {{ t('app.cookies.accept') }}
        </v-btn>
        <v-btn
          class="bg-error mr-1"
          variant="text"
          @click="cookiesStore.refuseCookies">
          {{ t('app.cookies.refuse') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import AppSectionHeader from '../components/app/section/AppSectionHeader.vue'
import AppSectionSubHeader from '../components/app/section/AppSectionSubHeader.vue'
import AppSectionText from '../components/app/section/AppSectionText.vue'
import { useI18n } from 'vue-i18n';
import { useCookiesStore } from '../stores';
import { useCoreOptions } from '../composition';

const { t } = useI18n()

const coreOptions = useCoreOptions()
const cookiesStore = useCookiesStore()
</script>

<style lang="sass" scoped>
.cookies-bar-margin
  margin-bottom: 120px
</style>
