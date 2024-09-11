import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';

const getManagement = async (cardId) => {
  const access = await getCookie('access');
  const response = await axios.get(`${OnRun}/api/manager/${cardId}/`, {
    headers: { Authorization: `Bearer ${access}` },
  });

  return response.data.data;
};

export default getManagement;
