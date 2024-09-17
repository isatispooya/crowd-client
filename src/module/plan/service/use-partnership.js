import { getCookie } from 'src/api/cookie';
import api from 'src/api/apiClient';
import { useMutation } from 'react-query';

const postDitail = async (data, id) => {
  const access = getCookie('access');

  const response = await api.post(
    `/api/participant/${id}/`,
    {
      data: {
        id: data.id,
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

  console.log("Response data:", response.data);
  return response.data;
};

const PostPartnership = () => {
  const {
    mutateAsync,
    data:datapost,
    isLoading:islodingpost,
    error:errorpost,
  } = useMutation(
    ({ data, id }) => postDitail(data, id), 
    
    {
      mutationKey: ['postDetail'],
    }
  );

  return {
    mutateAsync,
    datapost,
    islodingpost,
    errorpost,
  };
};

export default PostPartnership;
