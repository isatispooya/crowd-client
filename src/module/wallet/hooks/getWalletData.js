import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';

const fetchWallet = async (cartId) => {
  const access = getCookie('access');
  const response = await axios.get(`${OnRun}/api/wallet/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
  });
  // console.log(response.data.wallet)  
  return response.data.wallet;
};

export const useFetchWallet = (cartId) => {
  return useQuery({
    queryKey: ['wallet', cartId],
    queryFn: () => fetchWallet(cartId),
    // enabled: !!cartId,
   
  });
};