import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;