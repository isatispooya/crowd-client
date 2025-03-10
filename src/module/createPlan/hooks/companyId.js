import { useMutation } from '@tanstack/react-query';

import fetchData from '../services/companyInfoById.services';

const useFetchCompanyId = () => {
  const { data: responseData, mutate } = useMutation({
    mutationFn: fetchData,
  });

  return { data: responseData, submitCompanyData: mutate };
};

export default useFetchCompanyId;
