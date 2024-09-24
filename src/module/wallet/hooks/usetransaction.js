import { getCookie } from 'src/api/cookie';
import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const postDitail = async ({credit_amount,image_receipt,document_number}) => {
  const access = getCookie('access');
  console.log('================');
  console.log(image_receipt,credit_amount,document_number);
  
  

  const response = await api.post(
    `/api/transaction/`,
    {
    credit_amount,
    image_receipt,
    document_number
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

const useTransaction = () => {
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

export default useTransaction;
