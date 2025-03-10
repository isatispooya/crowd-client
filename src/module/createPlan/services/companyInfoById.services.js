import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const fetchData = async (data) => {
  const access = getCookie('access');
  const response = await api.post(`${OnRun}/api/register/company/rasmio/`, data, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};

export default fetchData;
