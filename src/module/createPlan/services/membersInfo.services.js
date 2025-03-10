import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const MembersInfo = async (data, memberId) => {
  const access = getCookie('access');
  const response = await api.patch(`/api/cart/step2/${memberId}/`, data, {
    headers: {
      Authorization: `Bearer ${access}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default MembersInfo;
