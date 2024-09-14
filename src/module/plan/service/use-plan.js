import { useQuery } from '@tanstack/react-query';

const planGet = () => {
  const response = [
    {
      id: 1,
      title: 'طرح سرمایه پذیر1',
      trackingCode: '123456789',
      createdDate: '14/04/1402',
      handledDate: '13/05/1403',
      status: 'در حال بررسی',
      expert: 'کارشناس الف',
    },
    {
      id: 2,
      title: 'طرح سرمایه گذار2',
      trackingCode: '987654321',
      createdDate: '14/04/1402',
      handledDate: '13/05/1403',
      status: 'تکمیل شده',
      expert: 'کارشناس ب',
    },
    {
      id: 3,
      title: 'طرح3سرمایه پذیر',
      trackingCode: '987654321',
      createdDate: '14/04/1402',
      handledDate: '13/05/1403',
      status: 'تکمیل شده',
      expert: 'کارشناس ب',
    },
    {
      id: 4,
      title: 'طرح سرمایه پذیر4',
      trackingCode: '123123123',
      createdDate: '14/04/1402',
      handledDate: '13/05/1403',
      status: 'در حال بررسی',
      expert: 'کارشناس ج',
    },
    {
      id: 5,
      title: 'طرح سرمایه گذار5',
      trackingCode: '456456456',
      createdDate: '14/04/1402',
      handledDate: '13/05/1403',
      status: 'تکمیل شده',
      expert: 'کارشناس د',
    },
  ];
  return response;
};

const UsePlan = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['plan'],
    queryFn: () => planGet(),
  });
  return {
    data,
    isLoading,
    error,
  };
};
export default UsePlan;
