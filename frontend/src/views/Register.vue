<template>
  <div class="register">
    <div class="register__card">
      <VaultTitle
        fontSize="32px"
        :animate="false"
        gap="5px"
        class="register__vaultTitle"
      />
      <form class="register__form" @submit.prevent="handleRegister">
        <div class="register__field">
          <label class="register__label" for="name">First Name</label>
          <input
            class="register__input"
            type="text"
            id="name"
            v-model="firstName"
            required
            placeholder="Enter your First name"
          />
        </div>
        <div class="register__field">
          <label class="register__label" for="name">Last Name</label>
          <input
            class="register__input"
            type="text"
            id="name"
            v-model="lastName"
            required
            placeholder="Enter your Last name"
          />
        </div>
        <div class="register__field">
          <label class="register__label" for="email">Email</label>
          <input
            class="register__input"
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="register__field">
          <label class="register__label" for="name">Username</label>
          <input
            class="register__input"
            type="text"
            id="name"
            v-model="username"
            required
            placeholder="Enter a Username"
          />
        </div>
        <div class="register__field register__field--password">
          <label class="register__label" for="password">Password</label>
          <div class="register__passwordWrapper">
            <input
              class="register__input"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
            />
            <i
              class="register__toggleIcon"
              :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              @click="showPassword = !showPassword"
            ></i>
          </div>
        </div>

        <div class="register__field register__field--password">
          <label class="register__label" for="confirmPassword"
            >Confirm Password</label
          >
          <div class="register__passwordWrapper">
            <input
              class="register__input"
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              placeholder="Confirm your password"
            />
            <i
              class="register__toggleIcon"
              :class="showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              @click="showConfirmPassword = !showConfirmPassword"
            ></i>
          </div>
        </div>

        <button type="submit" class="register__button">Sign Up</button>
        <span class="register__loginLink">
          Already have an account?
          <router-link to="/login">Log In</router-link>
        </span>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

import VaultTitle from "../components/VaultTitle.vue";
import { useToast } from "vue-toast-notification";
import api from "../api";
const toast = useToast();
const username = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const router = useRouter();
async function handleRegister() {
  if (
    !firstName.value ||
    !lastName.value ||
    !username.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    toast.warning("Please fill in all fields");
    return;
  }

  if (password.value !== confirmPassword.value) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const response = await api.post("/users/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      email: email.value,
      password: password.value,
    });

    if (response.status === 201 || response.status === 200) {
      const token = response.data.verificationToken;
      toast.success(`Account created for ${firstName.value} ${lastName.value}`);
      router.push(`/verify-email/${token}`);
    } else {
      toast.error(response.data.message || "Registration failed");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error registering account");
  }
}
</script>

<style lang="scss" scoped>
.register {
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
    width: 100%;

    &:focus {
      border-color: #ea357d;
      outline: none;
    }
  }

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

    &:hover {
      color: #ea357d;
    }
  }

  &__button {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(90deg, #ee7a3a, #ea357d);
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
  &__loginLink {
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
