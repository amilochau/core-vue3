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
        <v-btn @click="createMarker">
          Create marker
        </v-btn>
        <v-btn @click="editMarker">
          Edit marker
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
import { useMapsStore } from '../stores';
import { useMapsApi } from '../composition/maps.api';
import { useIsAuthenticated } from '@amilochau/core-vue3';

const mapsStore = useMapsStore()
const mapsApi = useMapsApi()

const isAuthenticated = useIsAuthenticated();

const fetchMaps = () => {
  mapsApi.get()
}

const createMarker = () => {
  mapsApi.createMarker("8a3f6eabfcc3400aba1adeabe071b8e2")
}

const editMarker = () => {
  mapsApi.editMarker("8a3f6eabfcc3400aba1adeabe071b8e2", "f3b9c83d0bf94cc098bfe92007add022")
}
</script>
