/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import InputPercent from 'src/components/input/inputPercent';
import SelectInput from 'src/components/input/inputSelect';
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
    
    try {
       mutateAsync(data);
      toast.success('اطلاعات با موفقیت ارسال شد.');
    } catch (error) {
      toast.error('خطا در ارسال اطلاعات.');
    }
  };

  const guaranteeOptions = [
    { type: '1', title: ' تعهد پرداخت بانکی ' },
    { type: '2', title: 'حسن پرداخت ' },
 
  ];
  const periodOptions=[
    {type:"1",title:'ماهه3'}
  ]
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
      setGuarantee(dataDetail.cart.guarantee)
      setPeriod(dataDetail.cart.payback_period)
    }
  }, [dataDetail]);


  useEffect(() => {
    if (errorCreate) {
      toast.error('خطا در ارسال اطلاعات.');
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
          <h1 className="text-2xl font-bold text-gray-700">اطلاعات قراراداد عاملیت</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-6 p-6 bg-white rounded-lg">
          <InputPercent value={farabourseFee} setValue={setFarabourseFee} label="درصد کارمزد فرابورس" />
          <InputPercent value={publicationFee} setValue={setPublicationFee} label="درصد کارمزد انتشار" />
          <InputPercent value={serviceFee} setValue={setServiceFee} label="درصد کارمزد ارائه خدمات" />
          <InputPercent value={createFee} setValue={setCreateFee} label="درصد کارمزد طراحی" />
          <InputPercent
            value={swimmingPercentage}
            setValue={setSwimmingPercentage}
            label="درصد شناوری تامین مالی "
          />
          <InputPercent value={rateProfit} setValue={setRateProfit} label="درصد سود مشارکت اسمی" />
          <SelectInput
            label="نوع ضمانت"
            value={guarantee}
            options={guaranteeOptions}
            handleSetValue={setGuarantee}
          />
           <SelectInput
            label=" دوره پرداخت"
            value={period}
            options={periodOptions}
            handleSetValue={setPeriod}
          />
          
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