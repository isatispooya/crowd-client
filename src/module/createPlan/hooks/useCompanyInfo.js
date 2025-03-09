import { useMutation } from '@tanstack/react-query';
import { CompanyInfo } from '../services';

const UseCompanyInfo = {
  
  useCompanyInfo: () => {
    const { mutate, isLoading } = useMutation({
      mutationKey: ['companyInfo'],
      mutationFn: CompanyInfo.postInfo,
    });

    return { mutate, isLoading };
  },
};

export default UseCompanyInfo;
