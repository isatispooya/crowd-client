import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const LogOut = async (traceCode) => {
  const access = getCookie('access');
  const response = await api.post(`/api/log/out/`, null ,  {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;

};

const useExist = () => {
  const { mutate, isLoading, isError, data, error } = useMutation({
    mutationFn: LogOut,
    mutationKey: ['exist'],
    onSuccess: (id) => {
      console.log('Logout successful:', id);
    },
    onError: (err) => {
      console.error('Logout failed:', err);
    },
    onSettled: () => {
      console.log('Logout mutation settled');
    },
  });

  return { mutate, isLoading, isError, data, error };
};

export default useExist;
