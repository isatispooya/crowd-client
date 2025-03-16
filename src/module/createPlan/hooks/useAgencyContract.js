import { useQuery } from '@tanstack/react-query';
import { getAgencyContract } from '../services';

const useAgencyContract = (uuid) => {
  return useQuery({
    queryKey: ['agencyContract', uuid],
    queryFn: () => getAgencyContract(uuid),
    enabled: !!uuid && uuid !== 'undefined',
    onError: (error) => {
      console.error('Error fetching agency contract:', error);
    },
  });
};

export default useAgencyContract;
