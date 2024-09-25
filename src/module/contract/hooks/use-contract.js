import { useMutation, useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import UseCartId from 'src/hooks/use-cartId';

const detailApi = async (cartId) => {
  const access = await getCookie('access');

  const response = await api.get(`/api/cart/detail/${cartId}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const createApi = async (data,cartId) => {
  const access = getCookie('access');
  const response = await api.post(
    `/api/setcart/${cartId}/`,
    {
      otc_fee: data.farabourseFee,
      guarantee: data.guarantee,
      partnership_interest: data.rateProfit,
      swimming_percentage: data.swimmingPercentage,
      payback_period: data.period,
      design_cost: data.createFee,
      dervice_fee: data.serviceFee,
      publication_fee: data.publicationFee,
      role_141:data.role_141,
      lock_role_141: false,
      Prohibited: data.Prohibited,
        lock_Prohibited: false,
        criminal_record: data.criminal_record,
        lock_criminal_record: false,
        effective_litigation: data.effective_litigation,
        lock_effective_litigation: false,
        bounced_check: false,
        lock_bounced_check: false,
        non_current_debt: false,
        lock_non_current_debt: false,
        minimum_deposit_10: false,
        lock_minimum_deposit_10: false,
    },
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );
  

  return response.data.cart;
};

const useContract = () => {
  const { cartId } = UseCartId();

  const {
    mutateAsync,
    data: dataCreate,
    isLoading: isLoadingCreate,
    error: errorCreate,
  } = useMutation({
    mutationKey: ['contract',cartId],
    mutationFn: (data) => {
      createApi(data,cartId);
    },
  });
  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
  } = useQuery({
    queryKey: ['contract',cartId],
    queryFn: () => detailApi(cartId),
  });

  return {
    mutateAsync,
    dataCreate,
    isLoadingCreate,
    errorCreate,
    dataDetail,
    isLoadingDetail,
    errorDetail,
  };
};


export default useContract
