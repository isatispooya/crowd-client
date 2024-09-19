import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const usePatchRefresh = () => {
  const patchRefresh = async (data) => {
    const access = await getCookie('access');

    const response = await axios.patch(
      `${OnRun}/api/update/profile/`,
      data, // ارسال داده‌های ورودی به ریکوئست
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    return response.data;
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ['patchRefresh'],
    mutationFn: patchRefresh,
    onError: (err) => {
      console.error('Error refreshing:', err);
    },
  });

  return { mutate, isLoading, isError, error };
};

export default usePatchRefresh;
