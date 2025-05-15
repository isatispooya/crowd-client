import { useMutation } from '@tanstack/react-query';
import { postPeyment } from '../../services/step_5';

const usePeyment = () => {
  return useMutation({
    mutationKey: ['postPeyment'],
    mutationFn: (data) => postPeyment(data),
  });
};

export default usePeyment;
