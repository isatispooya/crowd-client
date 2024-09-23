/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getCertificate = async (id) => {
  const access = await getCookie('access');
  const response = await api.get(`/api/participant/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
  
};


const usecertificate  = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['certificate ', id],
    queryFn: () => getCertificate(id),
    enabled: !!id,   
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default usecertificate;
