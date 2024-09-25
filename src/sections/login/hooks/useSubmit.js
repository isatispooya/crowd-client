import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import { useRouter } from 'src/routes/hooks';

const useSubmitOtp = (registerd) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['submitOtp'],
    mutationFn: async ({ nationalCode, otp }) => {
      const url_ = registerd ? `${OnRun}/api/login/` : `${OnRun}/api/signup/`;
      const response = await axios.post(url_, {
        uniqueIdentifier: nationalCode,
        otp,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setCookie('access', data.access, 5);
      toast.success('ورود با موفقیت انجام شد');
      if (registerd) {
        router.push('/dashboard');
      } else {
        router.push('/ProfilePage');
      }
      toast.warning(data.message);
    },
    onError: (error) => {
      console.error('خطا:', error);
      toast.error('خطا در ارسال درخواست به سرور.');
    },
  });
};

export default useSubmitOtp;
