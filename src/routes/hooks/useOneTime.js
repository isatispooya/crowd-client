import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';



const useOneTimeLogin = (uuid) => {
  return useQuery({
    queryKey: ['onetimeLogin'],
    queryFn: () => {
      return api.get(`/api/onetime/login/${uuid}/`);
    },

  });
};

export default useOneTimeLogin;
