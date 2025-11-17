export const SERVER_URL =
  (import.meta.env.VITE_SERVER_URL as string) || "http://localhost:3000";

// API base points to the server’s /api namespac
export const API_BASE_URL = `${SERVER_URL}/api`;
