import { useMutation } from '@tanstack/react-query';
import { postInvestor } from '../services';

const useInvestor = () => {
  return useMutation({
    mutationKey: ['investor'],
    mutationFn: (data) => postInvestor(data),
  });
};

export default useInvestor;
