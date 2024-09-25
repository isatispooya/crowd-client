import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { OnRun } from 'src/api/OnRun';

const useApplyNationalCode = () => {
  return useMutation({
    mutationKey: ['applyNationalCode'],  // کلیدی برای شناسایی درخواست
    mutationFn: async ({ nationalCode, captchaInput, encryptedResponse }) => {
      const response = await axios.post(`${OnRun}/api/otp/`, {
        uniqueIdentifier: nationalCode,
        captcha: captchaInput,
        encrypted_response: encryptedResponse,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      
      return data;
    },
    onError: (error) => {
      toast.error('خطا در ارسال درخواست به سرور.');
      console.error('خطا:', error);
    },
  });
};

export default useApplyNationalCode;
