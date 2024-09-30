/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import UseCartId from 'src/hooks/use-cartId';
import InputPercent from 'src/components/input/inputPercent';
import SelectInput from 'src/components/input/inputSelect';
import useGetContract from '../hooks/useGetContract';
import ToggleContract from '../componets/toggelContract';
import UsePostContract from '../hooks/use-contract';

const FormContract = () => {
  const { cartId } = UseCartId();
  const [contractData, setContractData] = useState({});
  const { data: dataContract, isError } = useGetContract(cartId);
  const { mutate, isLoading, isError: err } = UsePostContract(cartId);

  
  const handleSubmit = () => {
    mutate(contractData);
    toast.success();
  };

  const periodOptions = [{ type: '1', title: '3ماهه' }];

  const toggleLabels = [
    { label: 'متقاضی تعهد می‌نماید مشمول ماده ۱۴۱ نباشد.', key: 'role_141' },
    { label: 'متقاضی تعهد می‌نماید هیچگونه چک برگشتی نداشته باشد.', key: 'bounced_check' },
    {
      label: 'متقاضی تعهد می‌نماید هیچگونه بدهی غیر جاری در شبکه بانکی نداشته باشد.',
      key: 'non_current_debt',
    },
    { label: 'عامل این شرکت، دارای هیچگونه سابقه کیفری نباشند.', key: 'criminal_record' },
    {
      label: 'متقاضی تعهد می‌نماید هیچ یک از اعضای هیئت مدیره این شرکت ممنوع المعامله نباشند.',
      key: 'prohibited',
    },
    {
      label:
        'متقاضی متعهد است، پیش از انتشار کمپین نسبت به واریز حداقل 10 درصد از سرمایه مورد نیاز اقدام نماید.',
      key: 'minimum_deposit_10',
    },
  ];

  const guaranteeOptions = [
    { type: '1', title: ' تعهد پرداخت بانکی ' },
    { type: '2', title: 'حسن پرداخت ' },
    { type: '3', title: '(چک)اوراق بهادار' },
  ];

  const handleChangeToggle = (e, key) => {
    const { checked } = e.target;
    setContractData((prevData) => ({
      ...prevData,
      [key]: checked,
    }));
  };

  useEffect(() => {
    if (dataContract && !isError||err) {
      setContractData(dataContract?.cart);
    }
  }, [dataContract, isError,err]);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div dir="rtl" className="">
        <div className="bg-gray-200 text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">اطلاعات قرارداد عاملیت</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-6 p-6 bg-white rounded-lg">
          <InputPercent
            label="درصد شناوری تامین مالی"
            value={contractData}
            handle={(updatedData) => setContractData(updatedData)}
            keyName={'swimming_percentage'}
          />
          <InputPercent
            label="درصد سود مشارکت اسمی"
            value={contractData}
            handle={(updatedData) => setContractData(updatedData)}
            keyName={'partnership_interest'}
          />
          <SelectInput
            label="نوع ضمانت"
            value={contractData.guarantee || ''}
            options={guaranteeOptions}
            setContractData={setContractData}
            contractData={contractData}
            keyName={'guarantee'}
          />
          <SelectInput
            label="دوره پرداخت"
            value={contractData.payback_period || ''}
            options={periodOptions}
            setContractData={setContractData}
            contractData={contractData}
            keyName={'payback_period'}
          />
        </div>

        {toggleLabels.map(({ label, key }) => {
          const lockKey = `Lock_${key}`;
          const isDisabled = contractData[lockKey] === true;

          return (
            <ToggleContract
              key={key}
              label={label}
              value={contractData}
              checked={contractData?.[key] || false}
              handle={(e) => handleChangeToggle(e, key)}
              name={key}
              disabled={isDisabled}
            />
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <button
          onClick={handleSubmit}
          className={`flex items-center px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-md font-semibold hover:bg-blue-600 transition-all`}
          disabled={isLoading} 
          
        >
          {isLoading ? 'در حال ارسال...' : 'ارسال اطلاعات'}
        </button>
      </div>
      
    </>
  );
};

export default FormContract;
