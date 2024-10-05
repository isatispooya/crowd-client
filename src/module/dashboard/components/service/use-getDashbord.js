/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getDashbord } from './api/dashbordapi';


const useGetDashbord = (traceCode) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashbord', traceCode],
    queryFn: () =>  getDashbord(traceCode),
    enabled: !!traceCode,   
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetDashbord;
