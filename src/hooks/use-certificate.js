import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getCertificate = async (traceCode) => {
  const access = getCookie('access');
  const response = await api.post(`/api/certificate/user/${traceCode}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(response.data);
  return response.data.data;
};
const Usecertificate = (traceCode) => {
  const { data, isLoading, error } = useMutation({
    mutationKey: ['certificate', traceCode],
    mutationFn: () => getCertificate(traceCode),
  });
  return {
    data,
    isLoading,
    error,
  };
};

export default Usecertificate;
