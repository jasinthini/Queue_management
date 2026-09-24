import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("queue_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("queue_token");
      localStorage.removeItem("queue_user");
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
};

export const queueAPI = {
  getAll: () => api.get("/queue"),
  create: (data) => api.post("/queue", data),
  update: (id, data) => api.patch(`/queue/${id}`, data),
};

export const counterAPI = {
  getAll: () => api.get("/counters"),
};

export const serviceAPI = {
  getAll: () => api.get("/services"),
};

export const branchAPI = {
  getAll: () => api.get("/branches"),
};

export const organizationAPI = {
  getAll: () => api.get("/organizations"),
};

export const reportAPI = {
  getAll: () => api.get("/reports"),
};

export default api;
