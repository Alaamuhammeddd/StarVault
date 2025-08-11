// stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async register(data) {
      await axios.post("/register", data);
    },
    async login(data) {
      const res = await axios.post("/login", data);
      this.token = res.data.token;
      localStorage.setItem("token", this.token);
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
