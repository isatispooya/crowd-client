/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getParticipant = async (id) => {
  const access = await getCookie('access');

  const response = await api.get(`/api/participant/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
  
};




export default usegetParticipant;
const usegetParticipant = (id) => {
    const { data, isLoading, error } = useQuery({
      queryKey: ['plan', id],
      queryFn: () => getParticipant(id),
      enabled: !!id,   
    });
  
    if (error) {
      console.error('Error fetching participant data:', error);
    }
  
    return {
      data,
      isLoading,
      error,
    };
  };
  