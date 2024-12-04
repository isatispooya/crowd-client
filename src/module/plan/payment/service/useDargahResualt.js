import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const getDargahResult = async (invoiceId) => {
  const access = getCookie('access');
  const response = await api.get(
    `/api/transmission/user/${invoiceId}/`, 
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      }

    }
  );
  return response.data;
};


const useDargahResult = (invoiceId) => {
  const { data, isLoading, error , isSuccess } = useQuery({
    queryKey: ['dargahResult', invoiceId],
    queryFn: () => getDargahResult(invoiceId), 
  });

  return {
    isSuccess,
    data,
    isLoading,
    error,
  };
};
 
export default useDargahResult;
