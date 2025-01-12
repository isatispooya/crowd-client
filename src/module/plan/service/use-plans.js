import { useQuery } from '@tanstack/react-query';
import { getPlans } from './api/plansget';

const useGetPlans = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['plans'],
    queryFn: () => getPlans(),
    refetchInterval: 20000, 
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetPlans;
