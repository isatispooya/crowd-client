import { useQuery } from '@tanstack/react-query';
import api from '../../../api/apiClient';
import { getCookie } from '../../../api/cookie';

const useComplaints = (traceCode) => {
  const getComplaints = async () => {
    const access = getCookie('access');
    const response = await api.get(`/api/complaint/user/${traceCode}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['complaints', traceCode],
    queryFn: () => getComplaints(),
  });

  return { data, isLoading, isError };
};

export default useComplaints;
