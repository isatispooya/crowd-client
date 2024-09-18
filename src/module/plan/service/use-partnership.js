import { getCookie } from 'src/api/cookie';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const postDitail = async (data, id) => {
  const access = getCookie('access');
  

  const response = await api.post(
    `/api/participant/${data.id}/`,
    {
      data: {
        id:data.id,
        amount: data.amount,
        total_amount: data.total_amount,
        participant: data.participant,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

const PostPartnership = () => {
  const {
    mutateAsync,
    data: datapost,
    isLoading: islodingpost,
    error: errorpost,
    isError
  } = useMutation({
    mutationKey: ['postDetail'],
    mutationFn: ( data ) => postDitail(data),
  });

  return {
    mutateAsync,
    datapost,
    islodingpost,
    errorpost,
    isError
  };
};

export default PostPartnership;
