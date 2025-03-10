import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const MembersInfo = async (data, id) => {
  const access = getCookie('access');
  const response = await api.patch(`/api/cart/step2/${id}/`, data, {
    headers: { Authorization: `Bearer ${access}` },
  });
  return response.data;
};

export default MembersInfo;
