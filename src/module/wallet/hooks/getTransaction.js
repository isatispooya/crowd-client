import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';

const fetchTransaction = async () => {
  const access = getCookie('access');
  const response = await axios.get(`${OnRun}/api/transaction/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
  });
  console.log(response.data.transaction)  
  return response.data.transaction;
};

export const useFetchTransaction = (cartId) => {
  return useQuery({
    queryKey: ['transaction', cartId],
    queryFn: () => fetchTransaction(cartId),
    // enabled: !!cartId,
  });
};