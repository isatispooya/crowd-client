// api.js
import axios from 'axios';
import { OnRun } from './OnRun';
import { setCookie, getCookie } from './cookie';

const api = axios.create({
  baseURL: OnRun,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

let navigationFunction = null;
export const setNavigationFunction = (navigate) => {
  navigationFunction = navigate;
  return navigationFunction;
};

export async function refreshToken() {
  const refresh = getCookie('refreshApi');
  if (!refresh) throw new Error('No refresh token');

  try {
    const { data } = await axios.post(`${OnRun}/api/token/refresh/`, { refresh });
    setCookie('accessApi', data.access, 1);
    if (data.refresh) setCookie('refreshApi', data.refresh, 1);
    return data.access;
  } catch (err) {
    setCookie('accessApi', '', 0);
    setCookie('refreshApi', '', 0);
    if (navigationFunction) navigationFunction('/login');
    throw err;
  }
}

api.interceptors.request.use(
  (config) => {
    const token = getCookie('accessApi');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(Promise.reject);
      }

      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
