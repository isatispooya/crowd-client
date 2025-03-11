import { useMutation } from '@tanstack/react-query';
import { uploadExtraInfo } from '../../services/step_4';

const useUploadExtraInfo = (id) => {
  return useMutation({
    mutationKey: ['uploadExtraInfo'],
    mutationFn: (data) => uploadExtraInfo(data, id),
  });
};

export default useUploadExtraInfo;
