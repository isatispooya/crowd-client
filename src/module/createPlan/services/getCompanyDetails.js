import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';

const getCompanyDetails = async (id) => {
  const response = await api.get(`${OnRun}/api/investor/request/${id}/`);
  return response.data;
};

export default getCompanyDetails;
