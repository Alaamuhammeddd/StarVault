import axios from "axios";

const api = axios.create({
  baseURL: "https://star-vault.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
