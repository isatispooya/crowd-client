import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const getAssets = async () => {
  const access = await getCookie('access');
  const response = await api.get('/api/property/report/user/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};

export default getAssets;
