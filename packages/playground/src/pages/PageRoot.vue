<template>
  <div>
    <p>
      {{ `Header text from custom ${'PageRoot'}` }}
    </p>
    <router-view v-slot="{ Component }">
      <v-fade-transition mode="out-in">
        <component :is="Component" />
      </v-fade-transition>
    </router-view>
    <p>
      {{ `Footer text from custom ${'PageRoot'}` }}
    </p>
  </div>
</template>
