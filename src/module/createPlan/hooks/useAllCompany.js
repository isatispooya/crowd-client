import { useQuery } from '@tanstack/react-query';
import { getAllCompany } from '../services';

const useAllCompany = () => {
  return useQuery({
    queryKey: ['allCompany'],
    queryFn: getAllCompany,
  });
};

export default useAllCompany;
