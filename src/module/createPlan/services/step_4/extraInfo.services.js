import api from 'src/api/apiClient';

const uploadExtraInfo = async (data, id) => {
  const response = await api.patch(`/api/cart/step4/${id}/`, data);
  return response.data;
};

export default uploadExtraInfo;
