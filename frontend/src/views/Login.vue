<template>
  <div class="login">
    <div class="login__card">
      <VaultTitle
        fontSize="32px"
        :animate="false"
        gap="5px"
        class="login__vaultTitle"
      />
      <form class="login__form" @submit.prevent="handleLogin">
        <div class="login__field">
          <label class="login__label" for="email">Email</label>
          <input
            class="login__input"
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="login__field">
          <label class="login__label" for="password">Password</label>
          <input
            class="login__input"
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" class="login__button">Log In</button>
        <span class="login__registerLink">
          Don't have an account?
          <router-link to="/register">Register</router-link>
        </span>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import VaultTitle from "../components/VaultTitle.vue";
import api from "../api";
import { useToast } from "vue-toast-notification";
const email = ref("");
const password = ref("");
const router = useRouter();
const toast = useToast();

async function handleLogin() {
  if (!email.value || !password.value) {
    toast.warning("Please fill in all fields");
    return;
  }

  try {
    const { data } = await api.post(
      `${import.meta.env.VITE_VUE_APP_API_URL}/login`,
      {
        email: email.value,
        password: password.value,
      },
      {
        withCredentials: true, // if using axios
      }
    );

    // Save the token or user info from backend
    localStorage.setItem("token", data.token);

    toast.success("Login successful!");
    router.push("/");
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.error || "Login failed");
    } else {
      toast.error("An error occurred while logging in");
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  &__card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    width: 320px;
    animation: fadeInUp 1s ease;
  }
  &__vaultTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1.5rem;
  }
  &__title {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    text-align: center;
    font-weight: 700;
    color: #333;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  &__label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: #444;
  }

  &__input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;

    &:focus {
      border-color: #ea357d;
      outline: none;
    }
  }

  &__button {
    width: 100%;
    padding: 0.75rem;
    background: #fa7c54;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.9;
    }
  }
  &__registerLink {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
    color: #555;

    a {
      color: #ea357d;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
