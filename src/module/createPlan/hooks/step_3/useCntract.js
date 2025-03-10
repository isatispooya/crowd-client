import { useMutation } from '@tanstack/react-query';
import { uploadContract } from '../../services/step_3';

const useUploadContract = () => {
  return useMutation({
    mutationKey: ['uploadContract'],
    mutationFn: uploadContract,
  });
};

export default useUploadContract;
