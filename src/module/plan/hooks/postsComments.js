import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const usePostComments = (id) => {
  const postComment = async ({ comment, known }) => {
    const access = await getCookie('access');

    const response = await axios.post(
      `${OnRun}/api/comment/${id}`,
      { known : false, comment : null },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      console.log('Comment posted successfully:', data);
    },
    onError: (error) => {
      console.error('Error posting comment:', error);
    },
  });

  return mutation;
};

export default usePostComments;
