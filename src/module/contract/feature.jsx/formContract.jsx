/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import InputPercent from 'src/components/input/inputPercent';
import { toast, ToastContainer } from 'react-toastify';
import useContract from '../service/use-contract';

const FormContract = ()=> {
  const [farabourseFee, setFarabourseFee] = useState(1);
  const [publicationFee, setPublicationFee] = useState(1);
  const [serviceFee, setServiceFee] = useState(1);
  const [createFee, setCreateFee] = useState(1);
  const [swimmingPercentage, setSwimmingPercentage] = useState(80);
  const [rateProfit, setRateProfit] = useState(40);
  const [guarantee, setGuarantee] = useState('ضمانتنامه بانکی');
  const [period, setPeriod] = useState(3);
  const handleSubmit = () => {
    const data = {
      farabourseFee,
      publicationFee,
      serviceFee,
      createFee,
      swimmingPercentage,
      rateProfit,
      guarantee,
      period,
    };
    mutateAsync(data);
  };
  const GuaranteeTypes = [
    { type: '1', title: ' ماهه3' },

  ];

  const {
    mutateAsync,
    isLoadingCreate,
    errorCreate,
    dataDetail,
    isLoadingDetail,
  } = useContract();
  
  useEffect(() => {
    if (dataDetail) {

      setFarabourseFee(dataDetail.cart.otc_fee)
      setPublicationFee(dataDetail.cart.publication_fee)
      setServiceFee(dataDetail.cart.dervice_fee)
      setCreateFee(dataDetail.cart.design_cost)
      setSwimmingPercentage(dataDetail.cart.swimming_percentage)
      setRateProfit(dataDetail.cart.partnership_interest)
    }
  }, [dataDetail]);


    useEffect(() => {
    if (errorCreate) {
      toast.error('خطا در ارسال اطلاعات.');
    } else{
      toast.success('اطلاعات با موفقیت ارسال شد.');
    }
  }, [errorCreate]);

  if (isLoadingDetail || isLoadingCreate) {
    return <p>در حال بارگذاری ...</p>;
  }
  

  return (
    <>
    <ToastContainer autoClose={3000} />
      <div
        dir="rtl"
        className="max-w-5xl overflow-y-auto mx-auto p-8 bg-white rounded-lg shadow-xl"
      >
        <div className="bg-gray-200 text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">قرارداد عاملیت</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 p-6 bg-white rounded-lg">
          <InputPercent value={farabourseFee} setValue={setFarabourseFee} label="کارمزد فرابورس" />
          <InputPercent value={publicationFee} setValue={setPublicationFee} label="کارمزد انتشار" />
          <InputPercent value={serviceFee} setValue={setServiceFee} label="کارمزد ارائه خدمات" />
          <InputPercent value={createFee} setValue={setCreateFee} label="کارمزد طراحی" />
          <InputPercent
            value={swimmingPercentage}
            setValue={setSwimmingPercentage}
            label="درصد شناوری تامین مالی "
          />
          <InputPercent value={rateProfit} setValue={setRateProfit} label=" سود مشارکت اسمی" />
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">ضمانتنامه  :</label>
           <input
              type="text"
              value={guarantee}
              disabled
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">دوره پرداخت :</label>
            <input
              type="text"
              value={period}
              disabled
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            ارسال اطلاعات
          </button>
        </div>
      </div>
    </>
  );
}



export default FormContract