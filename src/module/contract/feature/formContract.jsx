/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import InputPercent from 'src/components/input/inputPercent';
import SelectInput from 'src/components/input/inputSelect';
import { toast, ToastContainer } from 'react-toastify';
import Loader from 'src/components/loader';
import useContract from '../hooks/use-contract';

const FormContract = () => {
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
    { type: '3', title: '(چک)اوراق بهادار' },
  ];
  const periodOptions = [{ type: '1', title: '3ماهه' }];
  const { mutateAsync, isLoadingCreate, errorCreate, dataDetail, isLoadingDetail } = useContract();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };
  useEffect(() => {
    if (dataDetail) {
      setFarabourseFee(dataDetail.cart.otc_fee);
      setPublicationFee(dataDetail.cart.publication_fee);
      setServiceFee(dataDetail.cart.dervice_fee);
      setCreateFee(dataDetail.cart.design_cost);
      setSwimmingPercentage(dataDetail.cart.swimming_percentage);
      setRateProfit(dataDetail.cart.partnership_interest);
      setGuarantee(dataDetail.cart.guarantee);
      setPeriod(dataDetail.cart.payback_period);
    }
  }, [dataDetail]);

  useEffect(() => {
    if (errorCreate) {
      toast.error('خطا در ارسال اطلاعات.');
    }
  }, [errorCreate]);

  if (isLoadingDetail || isLoadingCreate) {
    return <Loader />;
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
          <InputPercent
            value={farabourseFee}
            setValue={setFarabourseFee}
            label="درصد کارمزد فرابورس"
          />
          <InputPercent
            value={publicationFee}
            setValue={setPublicationFee}
            label="درصد کارمزد انتشار"
          />
          <InputPercent
            value={serviceFee}
            setValue={setServiceFee}
            label="درصد کارمزد ارائه خدمات"
          />
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
              <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">متقاضی تعهد می‌نماید مشمول ماده ۱۴۱ نباشد.</span>
              <input
                type="checkbox"
                name="role_141"
                className="toggle toggle-info"
                checked={dataDetail.role_141}
                onChange={handleChange}
                disabled={dataDetail.lock_role_141}
              />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">متقاضی متعهد است، پیش از انتشار کمپین نسبت به واریز حداقل10درصد از سرمایه مورد نیاز به شماره حساب اعلام شده از سوی عامل اقدام نماید.</span>
              <input
                type="checkbox"
                name="minimum_deposit_10"
                className="toggle toggle-info"
                checked={dataDetail.minimum_deposit_10}
                onChange={handleChange}
                disabled={dataDetail.lock_minimum_deposit_10}
              />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">متقاضی تعهد می‌نماید هیچگونه چک برگشتی نداشته باشد</span>
              <input
                type="checkbox"
                name="bounced_check"
                className="toggle toggle-info"
                checked={dataDetail.bounced_check}
                onChange={handleChange}
                disabled={dataDetail.lock_bounced_check}
              />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">متقاضی تعهد می‌نماید هیچ یک از اعضای هیئت مدیره این شرکت ممنوع المعامله نباشند .</span>
              <input
                type="checkbox"
                name="ReturnedCheck"
                className="toggle toggle-info"
                checked={dataDetail.Prohibited}
                onChange={handleChange}
                disabled={dataDetail.lock_Prohibited}
                />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">عامل این شرکت، دارای هیچگونه سابقه کیفری نباشند .</span>
              <input
                type="checkbox"
                name="criminal_record"
                className="toggle toggle-info"
                checked={dataDetail.criminal_record}
                onChange={handleChange}
                disabled={dataDetail.lock_criminal_record}
                />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">متقاضی تعهد می‌نماید هیچ گونه دعوای موثر علیه آن شرکت وجود ندارد.</span>
              <input
                type="checkbox"
                name="effective_litigation"
                className="toggle toggle-info"
                checked={dataDetail.effective_litigation}
                onChange={handleChange}
                disabled={dataDetail.lock_effective_litigation}

                />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">متقاضی تعهد می‌نماید هیچگونه بدهی غیر جاری در شبکه بانکی نداشته باشد</span>
              <input
                type="checkbox"
                name="non_current_debt"
                className="toggle toggle-info"
                checked={dataDetail.non_current_debt}
                onChange={handleChange}
                disabled={dataDetail.lock_non_current_debt}
                />
            </label>
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
};

export default FormContract;
