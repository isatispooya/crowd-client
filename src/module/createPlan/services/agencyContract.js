import axios from 'axios';
import { OnRun } from 'src/api/OnRun';

const getAgencyContract = async (uuid) => {
  const response = await axios.get(`${OnRun}/api/final/agency/agreement/?uuid=${uuid}`);
  return response.data;
};

export default getAgencyContract;
