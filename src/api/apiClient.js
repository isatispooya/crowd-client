import axios from 'axios';
import { OnRun } from './OnRun';
import { setCookie } from './cookie';

const api = axios.create({
  baseURL: OnRun,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

// Create a function to handle navigation
let navigationFunction = null;

export const setNavigationFunction = (navigate) => {
  navigationFunction = navigate;
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      setCookie('access', '', 0);
      if (navigationFunction) {
        navigationFunction('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
