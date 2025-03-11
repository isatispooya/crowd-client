import { useMutation } from '@tanstack/react-query';
import { uploadContract } from '../../services/step_3';

const useUploadContract = (id) => {
  return useMutation({
    mutationKey: ['uploadContract'],
    mutationFn: (data) => uploadContract(data, id),
  });
};

export default useUploadContract;
