<template>
  <div class="verify">
    <div class="verify__card">
      <h2 v-if="loading">Verifying your email...</h2>
      <div v-else>
        <h2 v-if="success" class="verify__success">✅ Email Verified!</h2>
        <h2 v-else class="verify__error">❌ Verification Failed</h2>

        <p v-if="success">You can now log in to your account.</p>
        <p v-else>The link may have expired or is invalid.</p>

        <router-link v-if="success" to="/login" class="verify__button">
          Go to Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api";

const route = useRoute();
const loading = ref(true);
const success = ref(false);

onMounted(async () => {
  const token = route.params.token as string;

  try {
    const res = await api.get(`/api/users/verify/${token}`);

    // If backend returns success, mark verified
    if (res.status === 200) {
      success.value = true;
    } else {
      success.value = false;
    }
  } catch (err: any) {
    console.error("Error verifying:", err.response?.data || err);
    success.value = false;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.verify {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  &__card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    width: 340px;
    text-align: center;
  }

  &__success {
    color: #28a745;
  }
  &__error {
    color: #dc3545;
  }

  &__button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem;
    background: linear-gradient(90deg, #ee7a3a, #ea357d);
    border-radius: 6px;
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
}
</style>
