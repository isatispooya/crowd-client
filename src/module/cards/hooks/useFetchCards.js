import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';

const fetchCards = async (access) => {
  const response = await axios.get(`${OnRun}/api/cart/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data.cart;
};

export const useFetchCards = (access) => {
  return useQuery({
    queryKey: ['cards', access],
    queryFn: () => fetchCards(access),
    enabled: !!access,
    refetchOnWindowFocus: false,
  });
};
