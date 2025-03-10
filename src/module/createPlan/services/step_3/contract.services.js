import api from 'src/api/apiClient';

const uploadContract = async (data, id) => {
  const response = await api.patch(`/api/cart/step3/${id}/`, data);
  return response.data;
};

export default uploadContract;
