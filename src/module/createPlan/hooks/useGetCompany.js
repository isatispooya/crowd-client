import { useQuery } from '@tanstack/react-query';
import { getCompanyDetails } from '../services';

const useGetCompany = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['company'],
    queryFn: () => getCompanyDetails(id),
  });

  return { data, isLoading, error };
};

export default useGetCompany;
