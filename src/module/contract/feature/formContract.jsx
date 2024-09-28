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
  const [value, setValue] = useState(null);
  const { data: dataContract, isError } = useGetContract(cartId);
  const { mutate, isLoading, isError: err } = UsePostContract(cartId);

  const handleSubmit = () => {
    mutate(contractData, {
      onSuccess: () => {
        toast.success('اطلاعات با موفقیت ارسال شد.');
      },
      onError: () => {
        toast.error('خطا در ارسال اطلاعات.');
      },
    });
  };

  const periodOptions = [{ type: '1', title: '3ماهه' }];

  const handleChangeToggle = (e) => {
    const { name, checked } = e.target;
    setContractData((prevData) => ({
      ...prevData,
      cart: {
        ...prevData.cart,
        [name]: checked,
      },
    }));
  };

  const labels = [
    'متقاضی تعهد می‌نماید مشمول ماده ۱۴۱ نباشد.',
    'متقاضی تعهد می‌نماید هیچگونه چک برگشتی نداشته باشد.',
    ' متقاضی تعهد می‌نماید هیچگونه بدهی غیر جاری در شبکه بانکی نداشته باشد.',
    'عامل این شرکت، دارای هیچگونه سابقه کیفری نباشند.',
    'متقاضی تعهد می‌نماید هیچ یک از اعضای هیئت مدیره این شرکت ممنوع المعامله نباشند.',
    'متقاضی متعهد است , پیش از انتشار کمپین نسبت به واریز حداقل 10 درصد از سرمایه مورد نیاز اقدام نماید',
  ];
  const guaranteeOptions = [
    { type: '1', title: ' تعهد پرداخت بانکی ' },
    { type: '2', title: 'حسن پرداخت ' },
    { type: '3', title: '(چک)اوراق بهادار' },
  ];

  useEffect(() => {
    if (dataContract && !isError) {
      setContractData(dataContract);
    }
  }, [dataContract, isError]);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div dir="rtl" className="">
        <div className="bg-gray-200 text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">اطلاعات قرارداد عاملیت</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-6 p-6 bg-white rounded-lg">
          <InputPercent
            value={value}

            label="درصد شناوری تامین مالی "
          />
          <InputPercent label="درصد سود مشارکت اسمی" />
          <SelectInput
            label="نوع ضمانت"
            value={value}
            options={guaranteeOptions}
         
          />
          <SelectInput
            label=" دوره پرداخت"
            value={value}
            options={periodOptions}
        
          />
        </div>

        {labels.map((label, index) => (
          <ToggleContract
            key={index}
            label={label}
            checked={contractData?.cart?.[index] || false}
            handle={handleChangeToggle}
            name={`toggle-${index}`}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          ارسال اطلاعات
        </button>
      </div>
    </>
  );
};

export default FormContract;
