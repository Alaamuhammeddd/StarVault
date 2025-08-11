<template>
  <div class="background-design"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.background-design {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/Vector\ 2.png"); /* replace with your PNG name */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; /* or contain depending on look */
  z-index: -1; /* stay behind everything */
  pointer-events: none; /* allows clicking through */
}

.background-design::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-image: url("../assets/Vector 2.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(30px) brightness(1.1);
  opacity: 0.7;
  pointer-events: none;

  mix-blend-mode: lighten;
}
</style>
