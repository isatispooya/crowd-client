import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from 'src/api/apiClient';
import { setCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import { useRouter } from 'src/routes/hooks';

const useSubmitOtp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['submitOtp'],
    mutationFn: async ({ nationalCode, otp, referal }) => {
      const url_ = `${OnRun}/api/login/`;
      const response = await api.post(url_, {
        uniqueIdentifier: nationalCode,
        otp,
        referal,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setCookie('access', data.access, 1);
      router.push('/');
      toast.warning(data.message);
    },
    onError: (error) => {
      setCookie('access', '', 0);
      toast.error(error.response.data.message);
    },
  });
};

export default useSubmitOtp;
