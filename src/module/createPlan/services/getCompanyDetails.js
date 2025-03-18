import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const getCompanyDetails = async (id) => {
  const access = getCookie('access');
  const response = await api.get(`${OnRun}/api/investor/request/${id}/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return response.data;
};

export default getCompanyDetails;
