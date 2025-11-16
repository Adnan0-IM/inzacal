export const SERVER_URL =
  (import.meta.env.VITE_SERVER_URL as string) || "https://lucid-intuition-production.up.railway.app";

// API base points to the server’s /api namespace
export const API_BASE_URL = `${SERVER_URL}/api`;
