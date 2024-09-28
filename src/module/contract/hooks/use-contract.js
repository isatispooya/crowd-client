import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const postContract = async ({cartId,contractData}) => {
  const access = getCookie('access');

  const response = await api.post(
    `/api/setcart/${cartId}/`,
    contractData,
    // {
    //   otc_fee: data.farabourseFee,
    //   guarantee: data.guarantee,
    //   partnership_interest: data.rateProfit,
    //   swimming_percentage: data.swimmingPercentage,
    //   payback_period: data.period,
    //   design_cost: data.createFee,
    //   dervice_fee: data.serviceFee,
    //   publication_fee: data.publicationFee,
    //   role_141: data.role_141,
    //   lock_role_141: false,
    //   Prohibited: data.Prohibited,
    //   lock_Prohibited: false,
    //   criminal_record: data.criminal_record,
    //   lock_criminal_record: false,
    //   effective_litigation: data.effective_litigation,
    //   lock_effective_litigation: false,
    //   bounced_check: false,
    //   lock_bounced_check: false,
    //   non_current_debt: false,
    //   lock_non_current_debt: false,
    //   minimum_deposit_10: false,
    //   lock_minimum_deposit_10: false,
    // },
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.cart;
};

const UsePostContract = (cartId) => {
  const { mutate, isLoading, IsError, isPending, error } = useMutation({
    mutationKey: ['contract', cartId],
    mutationFn: (contractData) => postContract({cartId,contractData}),
  });
  return {
    mutate,
    isLoading,
    IsError,
    isPending,
    error,
  };
};

export default UsePostContract;
