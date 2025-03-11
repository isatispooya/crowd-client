import api from 'src/api/apiClient';

const uploadContract = async (data, id) => {
  const response = await api.patch(`/api/cart/step3/${id}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default uploadContract;
