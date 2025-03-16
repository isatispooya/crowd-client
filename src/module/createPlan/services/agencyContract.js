import axios from 'axios';

const getAgencyContract = async (uuid) => {
  const response = await axios.get(`/api/final/agency/agreement/?uuid=${uuid}`);
  return response.data;
};

export default getAgencyContract;
