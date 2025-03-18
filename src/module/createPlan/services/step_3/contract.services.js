import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const uploadContract = async (data, id) => {
  const token = getCookie('access');
  const response = await api.patch(`/api/cart/step3/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default uploadContract;
