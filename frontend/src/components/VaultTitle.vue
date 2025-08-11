<template>
  <div
    class="vault-title"
    :style="{
      fontSize: fontSize,
      gap: gap,
      animation: animate ? `fadeInUp 1s ease-out forwards` : 'none',
    }"
  >
    <span class="gradient-text vault-title__star">Star</span>
    <span class="vault-title__vault">Vault</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
const props = defineProps({
  fontSize: { type: String, default: "10vw" },
  gap: { type: String, default: "20px" },
  animate: { type: Boolean, default: true },
});
</script>

<style scoped>
.vault-title {
  display: flex;

  .vault-title__vault {
    color: #333;
  }
  .vault-title__star {
    background: linear-gradient(90deg, #ee7a3a, #ea357d, #ee7a3a);
    background-size: 200% auto; /* makes the gradient move */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientMove 3s linear infinite;
  }
  @media screen and (max-width: 768px) {
    .vault-title {
      flex-direction: column;
      align-items: center;
    }
  }

  @media screen and (max-width: 480px) {
    .vault-title {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
