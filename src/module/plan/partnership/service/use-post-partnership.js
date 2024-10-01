import { getCookie } from 'src/api/cookie';
import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const postDitail = async ({traceCode,amount,status}) => {
  const access = getCookie('access');
  
  

  const response = await api.post(
    `/api/participant/${traceCode}/`,
    {
      amount,
      status
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
    mutate,
    data: datapost,
    isLoading: islodingpost,
    error: errorpost,
    isError
  } = useMutation({
    mutationKey: ['postDetail'],
    mutationFn: postDitail,
  });

  return {
    mutate,
    datapost,
    islodingpost,
    errorpost,
    isError
  };
};

export default PostPartnership;
