import { useMutation } from '@tanstack/react-query';
import { CompanyInfo } from '../services';

const UseCompanyInfo = {
  useCompanyInfo: (id) => {
    return useMutation({
      mutationKey: ['companyInfo', id],
      mutationFn: (data) => CompanyInfo.patchInfo(data, id),
    });
  },
};

export default UseCompanyInfo;
