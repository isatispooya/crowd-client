import axios from 'axios';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import { useQuery } from '@tanstack/react-query';

const useGetProfile = async () => {
  const access = getCookie('access');
  const getProfile = async () => {
    // const response = await axios.get(`${OnRun}/api/information/`, {
    //   headers: {
    //     Authorization: `Bearer ${access}`,
    //   },
    // });
    // console.log(response.data)
    // return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,

  });
  return {isLoading , data , isError, error};

};

export default useGetProfile;
