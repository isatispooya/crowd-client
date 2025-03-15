import api from 'src/api/apiClient';

const getBankLetter = async (uuid) => {
  if (!uuid || uuid === 'undefined') {
    throw new Error('شناسه یکتا معتبر نیست');
  }
  const response = await api.get(`/api/bank/letter/?uuid=${uuid}`);
  return response.data;
};

export default getBankLetter;
