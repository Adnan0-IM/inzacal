// export const SERVER_URL =
  // (import.meta.env.VITE_SERVER_URL as string) || "http://localhost:3000";
  // (import.meta.env.VITE_SERVER_URL as string) ||  window.location.origin;

// API base points to the server’s /api namespac
// export const API_BASE_URL = `${SERVER_URL}/api`;
export const API_BASE_URL = import.meta.env.PROD
  ? "/api"
  : "http://localhost:3000/api";