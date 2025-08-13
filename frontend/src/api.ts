import axios from "axios";

const isLocal = window.location.hostname === "localhost";

const api = axios.create({
  baseURL: isLocal
    ? "http://localhost:3000" // Local backend
    : "https://star-vault.vercel.app", // Production backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
