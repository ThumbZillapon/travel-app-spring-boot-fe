import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api"; // ดึงจาก .env

export const api = axios.create({
  baseURL,
});

