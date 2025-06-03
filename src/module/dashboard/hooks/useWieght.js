import { useQuery } from '@tanstack/react-query';
import getWeight from '../services/weight';

const useWeight = () => {
  return useQuery({
    queryKey: ['weight'],
    queryFn: getWeight,
  });
};

export default useWeight;
