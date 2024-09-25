import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getAppenices= async (id) => {
  const access = await getCookie('access');

  const response = await api.get(`/api/appendices/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;

};


const useAppenices = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['appendices', id],
    queryFn: () => getAppenices(id),
    enabled: !!id,   
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useAppenices;
