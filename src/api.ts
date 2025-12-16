import axios from "axios";

// Prefer `VITE_BASE_URL` when provided (Vercel / env-configured),
// otherwise fall back to a sensible default per environment.
// - Prod build (Vercel): use the Render backend URL
// - Dev (local): use localhost
const baseURL =
  import.meta.env.VITE_BASE_URL ||
  (import.meta.env.PROD
    ? "https://travel-app-spring-boot.onrender.com/api"
    : "http://localhost:8080/api");

export const api = axios.create({
  baseURL,
});

