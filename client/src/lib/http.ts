import axios from "axios";
import { API_BASE_URL } from "@/config/constants";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Better Auth uses cookies
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    err.message = err.response?.data?.error || err.message || "Request failed";
    return Promise.reject(err);
  }
);
