import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';

const gettAllCompany = async () => {
  const response = await api.get(`${OnRun}/api/investor/request/`);
  return response.data;
};

export default gettAllCompany;
