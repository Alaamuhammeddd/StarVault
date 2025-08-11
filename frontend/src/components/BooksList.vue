<template>
  <div>
    <h1>Books</h1>
    <ul>
      <li v-for="book in books" :key="book._id">
        {{ book.title }} by {{ book.author }} ({{ book.publishedYear }})
        <i style="color: gray">{{ book.genre }}</i>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/api";

const books = ref([]);

onMounted(async () => {
  try {
    const res = await api.get("/api/books");
    books.value = res.data;
  } catch (err) {
    console.error("Failed to fetch books:", err);
  }
});
</script>
