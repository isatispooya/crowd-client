import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getPlan = async (trace_code) => {
  const access = await getCookie('access');
  const response = await api.get(`/api/plan/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};



const useGetPlan = (trace_code) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['plan', trace_code],
    queryFn: () => getPlan(trace_code),
    enabled: !!trace_code,   
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useGetPlan;
