import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';


const getPlans = async () => {
  const access = await getCookie('access');
  const response = await api.get(`/api/plans/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};


const useGetPlans = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['plans'],
    queryFn: () => getPlans(),
  });

  return {
    data,
    isLoading,
    error,
    
  };
};

export default useGetPlans;
