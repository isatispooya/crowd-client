/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getCertificate = async () => {
  const access = getCookie('access');
  const response = await api.get(`/api/certificate/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.data;
};
const usecertificate = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['certificate '],
    queryFn: () => getCertificate(),
  });
  return {
    data,
    isLoading,
    error,
  };
};

export default usecertificate;
