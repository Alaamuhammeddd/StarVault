import axios from "axios";

// Get API URL from environment variable with fallback
const getApiUrl = () => {
  // Check if we have the environment variable set
  if (import.meta.env.VITE_VUE_APP_API_URL) {
    return import.meta.env.VITE_VUE_APP_API_URL;
  }

  // Fallback to checking hostname if env var is not set
  const isLocal = window.location.hostname === "localhost";
  return isLocal
    ? "http://localhost:3000/" // Local backend
    : "https://star-vault.vercel.app/"; // Production backend
};

const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ This is key for CORS with credentials
});

export default api;
