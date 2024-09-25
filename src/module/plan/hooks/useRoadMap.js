import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const useRoadMap = (id) => {
  const getRoadmap = async () => {
    const access = await getCookie('access');
    const response = await axios.get(`${OnRun}/api/roadmap/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  };
  const {isLoading  , data} = useQuery({
    queryKey : ["roadmap" , id],
    queryFn : getRoadmap,
    
  })
};
