import axios from "axios";

const apiBaseUrl = import.meta.env.API_URL || import.meta.env.VITE_SQL_API_BASE_URL;

const api = axios.create({
  baseURL: import.meta.env.DEV ?
    "/api":
    apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;