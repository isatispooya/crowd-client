import { useQuery } from '@tanstack/react-query';
import { getCompanyDetails } from '../services';

const useGetCompany = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['company'],
    queryFn: (id) => getCompanyDetails(id),
  });

  return { data, isLoading, error };
};

export default useGetCompany;
