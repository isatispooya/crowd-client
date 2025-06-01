import { useQuery } from '@tanstack/react-query';
import { getProfit } from '../services';

const useProfit = () => {
  return useQuery({
    queryKey: ['profit'],
    queryFn: getProfit,
  });
};

export default useProfit;
