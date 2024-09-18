import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const useGetComments = (id) => {
  const getComments = async () => {
    const access = await getCookie('access');

    const response = await axios.get(`${OnRun}/api/comment/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    console.log(response.data)
    return response.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: ['getComments', id],
    queryFn: getComments,
  });
  return { isLoading, data };

};
export default useGetComments;