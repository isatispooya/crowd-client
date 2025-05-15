import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const getPaymentCallBack = async (params) => {
  try {
    const access = getCookie('access');
    const response = await api.patch(
      `/api/payment/investor/callback/`, 
      params,
      {
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Payment callback error:', error);
    throw error;
  }
};


const usePaymentCallBack = (params) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['paymentCallBack', params],
    queryFn: () => getPaymentCallBack(params),
    enabled: !!params?.invoice_payment,
    retry: false,
  });

  return {
    isSuccess,
    data,
    isLoading,
    error,
  };
};
 
export default usePaymentCallBack;
