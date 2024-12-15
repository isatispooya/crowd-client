import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';

const useApplyNationalCode = () => {
  return useMutation({
    mutationKey: ['applyNationalCode'],
    mutationFn: async ({ nationalCode, captchaInput, encryptedResponse }) => {
      const response = await api.post(`${OnRun}/api/otp/`, {
        uniqueIdentifier: nationalCode,
        captcha: captchaInput,
        encrypted_response: encryptedResponse,
      });
   
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("کد تایید به شماره تماس و ایمیل ارسال شد");
      return data;
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message || "برای ارسال کد مجدد 2 دقیقه منتظر بمانید");
      } else {
        toast.error("برای ارسال کد مجدد 2 دقیقه منتظر بمانید");
      }
    },
  });
};

export default useApplyNationalCode;
