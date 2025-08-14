<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const quote = ref("");
const author = ref("");

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/quote");
    quote.value = response.data.q;
    author.value = response.data.a;
  } catch (error) {
    console.error("Error fetching quote of the day:", error);
  }
});
</script>

<template>
  <div class="quote-of-the-day">
    <p>{{ quote }}</p>
    <footer>— {{ author }}</footer>
  </div>
</template>

<style scoped>
.quote-of-the-day {
  padding: 1rem;
  margin: 1rem 0;
}
</style>
