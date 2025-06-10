import axios from "axios";
import { redirect } from "react-router-dom";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      redirect("/login");
    }

    throw error;
  }
);

export { api };
