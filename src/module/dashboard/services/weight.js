import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const getWeight = async () => {
  const access = await getCookie('access');
  const response = await api.get('api/investment/weight/user/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};

export default getWeight;
