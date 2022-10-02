<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="text-center">
        <home-welcome />
        <home-messages />
        <home-login v-if="!isAuthenticated" />
        <home-maps v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import HomeWelcome from '../components/home/HomeWelcome.vue'
import HomeLogin from '../components/home/HomeLogin.vue'
import HomeMaps from '../components/home/HomeMaps.vue'
import HomeMessages from '../components/home/HomeMessages.vue'
import { useMapsStore } from '../stores';
import { useIsAuthenticated } from '../composition/msal';

const mapsStore = useMapsStore()
const isAuthenticated = useIsAuthenticated();

// Get latest maps when user is logged
if (isAuthenticated.value) {
  mapsStore.get()
}
</script>
