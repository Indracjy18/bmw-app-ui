import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const axiosAuth = axios.create({
  baseURL: API_URL,
});

// Interceptor untuk menyisipkan token ke header Authorization
axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
