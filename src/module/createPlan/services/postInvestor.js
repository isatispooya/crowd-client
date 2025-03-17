import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const postInvestor = async (data) => {
  const access = getCookie('access');
  const response = await api.post('/api/investor/request/', data, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};

export default postInvestor;
