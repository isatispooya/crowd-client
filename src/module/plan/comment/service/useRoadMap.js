import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const useRoadMap = (traceCode) => {
  const getRoadmap = async () => {
    const access = await getCookie('access');
    const response = await axios.get(`${OnRun}/api/roadmap/${traceCode}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: ['roadmap', traceCode],
    queryFn: getRoadmap,
    retry: 2,
  });
  return { isLoading, data };
};

export default useRoadMap;
