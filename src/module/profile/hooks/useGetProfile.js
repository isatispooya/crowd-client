import { getCookie } from 'src/api/cookie';
import { useQuery } from '@tanstack/react-query';

const useGetProfile = async () => {
  const access = getCookie('access');
  const getProfile = async () => {
 
     return access;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,

  });
  return {isLoading , data , isError, error};

};

export default useGetProfile;
