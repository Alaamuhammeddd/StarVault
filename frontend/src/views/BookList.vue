<template>
  <div class="book-list">
    <h1>Book List</h1>
    <ul>
      <li v-for="book in books" :key="book._id">
        {{ book.title }} by {{ book.author }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api";
import type { Book } from "../types/Books";

const books = ref<Book[]>([]);

onMounted(async () => {
  try {
    const response = await api.get("/api/books");
    books.value = response.data;
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
});
</script>

<style scoped lang="scss"></style>
