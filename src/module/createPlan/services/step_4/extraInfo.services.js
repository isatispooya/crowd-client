import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const uploadExtraInfo = async (data, id) => {
  const access = getCookie('access');
  const response = await api.patch(`/api/cart/step4/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'multipart/form-data', // This line should be removed
    },
  });
  return response.data;
};

export default uploadExtraInfo;
