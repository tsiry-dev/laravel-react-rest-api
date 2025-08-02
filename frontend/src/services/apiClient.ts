import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { clearToken, getToken } from "../utils/auth";


const axiosClient: AxiosInstance = axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000,
})


axiosClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      clearToken();
      // Optionnel : redirection automatique vers login
    //   window.location.href = '/login';
    }

    // Tu peux ici logger ou envoyer à Sentry/Raygun
    // console.error('API Error:', error);

    // On relance l'erreur pour que le composant puisse gérer
    return Promise.reject(error);
  }
);

export default axiosClient;
