import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';
import { useQuery } from '@tanstack/react-query';

export const getCerByTraceCode = async (traceCode) => {
  const access = await getCookie('access');
  const response = await api.get(`/api/participant/user/pdf/${traceCode}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const useCerByTraceCode = (traceCode) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cerByTraceCode', traceCode],
    queryFn: () => getCerByTraceCode(traceCode),
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useCerByTraceCode;
