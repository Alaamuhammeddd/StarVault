<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import VectorBackground from "./components/VectorBackground.vue";
const route = useRoute();
</script>

<template>
  <div id="app">
    <VectorBackground v-if="route.path !== '/'" />
    <main class="page-container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
}

.page-container {
  position: relative;
  z-index: 1;
}
</style>
