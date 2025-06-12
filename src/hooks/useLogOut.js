import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie, setCookie } from 'src/api/cookie';
import useAuth from 'src/module/navbar/service';
import { useNavigate } from 'react-router-dom';

const LogOut = async () => {
  const access = getCookie('access');
  const refresh = getCookie('refresh');

  const response = await api.post(
    `/api/login/`,
    { refresh },
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );

  return response.data;
};

const useExist = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { mutate, isLoading, isError, data, error } = useMutation({
    mutationFn: LogOut,
    mutationKey: ['exist'],
    onSettled: () => {
      logout();

      setCookie('access', '', 0);
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      navigate('/login');
    },
  });

  return { mutate, isLoading, isError, data, error };
};

export default useExist;
