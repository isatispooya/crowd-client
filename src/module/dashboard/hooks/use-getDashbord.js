/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getDashbord } from '../services/dashbord';

const useGetDashbord = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashbord'],
    queryFn: () => getDashbord(),
  });

  return {
    data,
    isLoading,
    error,
  };
};
export default useGetDashbord;
