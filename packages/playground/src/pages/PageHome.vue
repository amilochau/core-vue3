<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="text-center">
        <home-welcome />
        <home-messages />
        <home-login v-if="!isAuthenticated" />

        <p>{{ mapsStore.items }}</p>
        <v-btn @click="fetchMaps">
          Fetch maps
        </v-btn>

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
import { useMapsStore } from '../stores';
import { useMapsApi } from '../composition/maps.api';

const mapsStore = useMapsStore()
const mapsApi = useMapsApi()

const isAuthenticated = useIsAuthenticated();

const fetchMaps = () => {
  mapsApi.get()
}
</script>
