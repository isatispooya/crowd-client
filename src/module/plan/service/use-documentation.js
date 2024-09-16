import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';

const getDocumentation = async (id) => {
  const access = await getCookie('access');
  console.log("efrty",id)

  const response = await api.get(`/api/documentation/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(response.data)
  return response.data.data;
  
};


const useDocumentation = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocumentation(id),
    enabled: !!id,   
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useDocumentation;
