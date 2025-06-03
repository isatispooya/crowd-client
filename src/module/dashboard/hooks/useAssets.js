import { useQuery } from '@tanstack/react-query';
import { getAssets } from '../services';

const useAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: getAssets,
  });
};

export default useAssets;
