<template>
  <div class="login">
    <div class="login__card">
      <!-- Title -->
      <VaultTitle
        fontSize="32px"
        :animate="false"
        gap="5px"
        class="login__vaultTitle"
      />

      <!-- Form -->
      <form class="login__form" @submit.prevent="handleLogin">
        <!-- Email Field -->
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

        <!-- Password Field -->
        <div class="login__field login__field--password">
          <label class="login__label" for="password">Password</label>
          <div class="login__passwordWrapper">
            <input
              class="login__input"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
            />
            <i
              class="login__toggleIcon"
              :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              @click="showPassword = !showPassword"
            ></i>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="login__button">Log In</button>

        <!-- Register Link -->
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
import { useToast } from "vue-toast-notification";
import VaultTitle from "../components/VaultTitle.vue";
import api from "../api";

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const router = useRouter();
const toast = useToast();

async function handleLogin() {
  if (!email.value || !password.value) {
    toast.warning("Please fill in all fields");
    return;
  }

  try {
    const response = await api.post(
      `${import.meta.env.VITE_VUE_APP_API_URL}/login`,
      { email: email.value, password: password.value },
      { withCredentials: true }
    );

    console.log("Login response:", response);
    const { data } = response;

    if (!data.message || !data.user) {
      console.error("Missing required fields in response:", data);
      toast.error("Invalid server response. Please try again.");
      return;
    }

    // Save user info and role
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    console.log("Login successful - Role:", data.user.role); // Debug log
    toast.success(data.message);

    // Redirect based on role
    if (data.user.role === "admin") {
      console.log("Redirecting to admin dashboard");
      router.push("/admin-dashboard");
    } else {
      console.log("Redirecting to user dashboard");
      router.push("/dashboard");
    }
  } catch (error: any) {
    console.error("Login error:", error); // Debug log
    if (error.response) {
      console.error("Error response:", error.response); // Debug log
      toast.error(
        error.response.data?.error ||
          error.response.data?.message ||
          "Login failed"
      );
    } else if (error.request) {
      toast.error("No response received from server");
    } else {
      toast.error("An error occurred while logging in");
    }
  }
}
</script>

<style lang="scss" scoped>
/* Layout */
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
    margin-bottom: 1.5rem;
  }
}

/* Form Structure */
.login {
  &__form {
    display: flex;
    flex-direction: column;
  }

  &__field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    &--password {
      position: relative;
    }
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

    &[type="password"],
    &[type="text"] {
      padding-right: 3.2rem;
    }
  }
}

/* Password Toggle */
.login {
  &__passwordWrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__toggleIcon {
    position: absolute;
    right: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    color: #888;
    transition: color 0.3s ease;
    z-index: 2;

    &:hover {
      color: #ea357d;
    }
  }
}

/* Buttons & Links */
.login {
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
