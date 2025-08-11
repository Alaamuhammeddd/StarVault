<template>
  <div class="home">
    <VaultTitle />
    <router-link to="/login" class="home__enterBtn">Enter Vault</router-link>
  </div>
</template>
<script setup lang="ts">
import VaultTitle from "../components/VaultTitle.vue";
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
  min-height: 100vh;
  &__textWrapper {
    display: flex;
    align-items: center;
    font-size: 10vw;
    gap: 20px;
    animation: fadeInUp 1s ease-out forwards;
  }

  &__gradiantText {
    background: linear-gradient(90deg, #ee7a3a, #ea357d, #ee7a3a);
    background-size: 200% auto; /* makes the gradient move */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientMove 3s linear infinite;
  }

  &__regularText {
    color: #333;
  }
  &__enterBtn {
    margin-top: 2rem;
    padding: 1rem 2rem;
    font-size: 1.5rem;
    background: linear-gradient(90deg, #ee7a3a, #ea357d);
    color: white;
    border-radius: 50px;
    text-decoration: none;
    box-shadow: 0 0 20px rgba(234, 53, 125, 0.7);
    transition: all 0.3s ease-in-out;
    animation: fadeInUp s ease, pulse 2s infinite;
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 30px rgba(234, 53, 125, 1);
    }
  }
}

/* Keyframes for gradient movement */
@keyframes gradientMove {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

/* Keyframes for fade-in and slight upward movement */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 15px rgba(234, 53, 125, 0.6);
  }
  50% {
    box-shadow: 0 0 30px rgba(234, 53, 125, 1);
  }
}
/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .home__textWrapper {
    flex-direction: column;
    align-items: center;
    font-size: 20vw;
    gap: 5px;
  }
}

@media screen and (max-width: 480px) {
  .home__textWrapper {
    flex-direction: column;
    align-items: center;
    font-size: 20vw;
    gap: 2px; /* even smaller gap on very small screens */
  }
}
</style>
