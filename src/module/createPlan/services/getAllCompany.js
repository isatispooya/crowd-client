import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const gettAllCompany = async () => {
  const access = getCookie('access');
  const response = await api.get(`${OnRun}/api/investor/request/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};

export default gettAllCompany;
