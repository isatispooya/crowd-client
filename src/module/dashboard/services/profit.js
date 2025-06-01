import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const getProfit = async () => {
  const access = await getCookie('access');
  const response = await api.get('/api/list/user/profits/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};

export default getProfit;
