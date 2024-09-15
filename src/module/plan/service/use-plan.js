import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getPlanData = async (id) => {
  const access = await getCookie('access');

  const response = await api.get(`/api/plan/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(response.data)
  return response.data.data;
  
};



const usePlan = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['plan', id],
    queryFn: () => getPlanData(id),
    enabled: !!id,   
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default usePlan;
