import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';


const getPlansData = async () => {
  const access = await getCookie('access');

  const response = await api.get(`/api/plan/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
  
};


const usePlans = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['plans'],
    queryFn: () => getPlansData(),
  });
  return {
    data,
    isLoading,
    error,
    
  };
};
export default usePlans;
