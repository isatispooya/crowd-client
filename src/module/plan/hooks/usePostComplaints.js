import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const usePostComplaints = (traceCode) => {
  const access = getCookie('access');
  const postComplaints = async (data) => {
    const response = await api.post(`/api/complaint/user/${traceCode}/`, data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  };

  const { data, isLoading, isError, mutate } = useMutation({
    mutationKey: ['postComplaints', traceCode],
    mutationFn: (Cdata) => postComplaints(Cdata),
  });

  return { data, isLoading, isError, mutate };
};

export default usePostComplaints;
