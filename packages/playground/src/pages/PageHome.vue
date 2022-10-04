<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="text-center">
        <home-welcome />
        <home-messages />
        <home-login v-if="!isAuthenticated" />

        <v-select />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import HomeWelcome from '../components/home/HomeWelcome.vue'
import HomeLogin from '../components/home/HomeLogin.vue'
import HomeMessages from '../components/home/HomeMessages.vue'
import { useIsAuthenticated } from '../composition/msal';


const isAuthenticated = useIsAuthenticated();
</script>
