import axios from "axios";

const api = process.env.REACT_APP_API || "http://localhost:5000";

export default axios.create({
  baseURL: api,
});

export const axiosPrivate = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('authTokens');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);