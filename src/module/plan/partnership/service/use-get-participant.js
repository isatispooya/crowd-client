/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getPartner = async (traceCode) => {
  const access = await getCookie('access');
  const response = await api.get(`/api/participant/${traceCode}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(",lokijui",response.data)
  return response.data;
};

const usepartner = (traceCode) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['partner', traceCode],
    queryFn: () => getPartner(traceCode),
    enabled: !!traceCode,   
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default usepartner;
