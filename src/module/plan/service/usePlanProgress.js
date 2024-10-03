import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import axios from 'axios';

export const usePlanProgress = (traceCode) => {

  const getPlanProgress = async () => {
    const access = await getCookie('access');
    
    const response = await axios.get(`${OnRun}/api/progres/report/admin/${traceCode}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['progress', traceCode],
    queryFn: getPlanProgress,
    enabled: !!traceCode,
  });

  return {
    data,
    isLoading,
    error,
  };
};
