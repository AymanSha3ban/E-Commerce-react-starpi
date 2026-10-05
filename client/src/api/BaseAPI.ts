import { useAuthStore } from "@/Store/authStore";
import axios from "axios";

export const API = import.meta.env.VITE_SERVER_URL;

export const PublicAPI = axios.create({
  baseURL: API,
});
export const PrivateAPI = axios.create({
  baseURL: API,
});

PrivateAPI.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});