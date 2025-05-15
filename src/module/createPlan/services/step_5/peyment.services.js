import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const postPeyment = async (data) => {
  const access = getCookie('access');
  const response = await api.post(`/api/payment/investor/`, data, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default postPeyment;
