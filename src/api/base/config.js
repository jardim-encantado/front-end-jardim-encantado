import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "https://api-jardim-encantado.onrender.com";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "" : apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;