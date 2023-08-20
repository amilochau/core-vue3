<template>
  <v-container
    :class="{ 'pa-0': xs }">
    <v-row
      v-if="!xs"
      justify="center">
      <v-col
        cols="12"
        sm="6"
        class="text-center">
        <h1 class="my-4 text-h5 text-primary">
          {{ name }}
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="9"
        md="8"
        lg="6">
        <v-card
          :class="{ 'bg-transparent': xs }"
          flat>
          <slot />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

defineProps<{
  title: string
}>()

const { xs, name } = useDisplay()
</script>
