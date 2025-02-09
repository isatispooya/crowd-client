import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import PropTypes from 'prop-types';
import { Divider } from '@mui/material';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { FaPercent } from 'react-icons/fa';
import GaugeComponent from 'react-gauge-component';
import { BsPersonFillCheck } from 'react-icons/bs';
import { RiFundsFill, RiCalendarScheduleFill } from 'react-icons/ri';
import { HiCheckCircle } from 'react-icons/hi';
import React, { useEffect } from 'react';
import { OnRun } from '../../../api/OnRun';


const PlanCart = ({ handleDetailsClick, key, plan }) => {
  const planStatusOptions = [
    { id: '1', label: 'شروع شده', color: 'bg-green-500' },
    { id: '2', label: 'شروع نشده', color: 'bg-gray-500' },
    { id: '3', label: 'تمدید شده', color: 'bg-yellow-500' },
    { id: '5', label: 'تکمیل شده', color: 'bg-blue-500' },
    { id: '4', label: 'ناموفق', color: 'bg-red-500' },
  ];
  const rate_of_return = plan.information_complete.rate_of_return;
  const base_rate_of_return = rate_of_return.split('.')[0];
  const percentage_rate_of_return = rate_of_return.split('.')[1];
  const status_label = planStatusOptions.find(
    (option) => option.id === plan.information_complete.status_second
  )?.label;
  const status_color = planStatusOptions.find(
    (option) => option.id === plan.information_complete.status_second
  )?.color;

  const baseCount = useMotionValue(0);
  const percentageCount = useMotionValue(0);
  const roundedBase = useTransform(baseCount, Math.round);
  const roundedPercentage = useTransform(percentageCount, Math.round);

  useEffect(() => {
    const baseControls = animate(baseCount, parseInt(base_rate_of_return, 10), {
      duration: 2,
      ease: 'easeOut',
    });
    const percentageControls = animate(percentageCount, parseInt(percentage_rate_of_return, 10), {
      duration: 2,
      ease: 'easeOut',
    });

    return () => {
      baseControls.stop();
      percentageControls.stop();
    };
  }, [base_rate_of_return, percentage_rate_of_return, baseCount, percentageCount]);

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, translateX: -100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        duration: 1,
      }}
      className="flex flex-col items-center bg-white shadow-md rounded-lg w-[390px]  mb-8 min-h-[400px] relative overflow-hidden hover:shadow-2xl cursor-pointer transition-shadow duration-300"
      onClick={handleDetailsClick}
    >
     {plan.information_complete.viedo ? (
        <React.Suspense fallback={<div className="w-full h-52 flex items-center justify-center">در حال بارگذاری ویدیو...</div>}>
          <video
            src={`${OnRun}/${plan.information_complete.viedo}`}
            alt="مشکل در بارگزاری ویدیو"
            width={400}
            height={200}
            className="w-full object-cover rounded-t-lg"
            autoPlay
            muted
            loop
         
          />
        </React.Suspense>
      ) : (
        <img
          src={`${OnRun}/${plan.picture_plan.picture}`}
          alt="مشکل در بارگزاری عکس"
          width={400}
          height={200}
          className="w-full object-cover rounded-t-lg"
        />
      )}
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        className={`absolute  top-0 p-1 left-[-50%] w-full mt-[30px] ml-[40px] ${status_color} flex justify-center items-center transform rotate-[-45deg] transform-origin-top-left`}
      >
        <h1 className="text-white text-sm font-bold">{status_label}</h1>
      </motion.div>

      <motion.div className="flex flex-row items-center justify-around w-2/3 mt-[-20px] p-2 bg-white rounded-lg">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-row items-center justify-center w-[60px] relative"
        >
          <motion.h1 className="text-green-500 text-sm">{roundedPercentage}</motion.h1>
          <motion.h1 className="text-green-500 text-sm">/</motion.h1>
          <motion.h1 className="text-green-500 text-2xl font-bold">{roundedBase}</motion.h1>
        </motion.div>
        <FaPercent className="text-green-500 text-1xl ml-1 mr-[-5px]" />
        <Divider orientation="vertical" flexItem />

        <motion.div className="flex flex-row items-center justify-center">
          <motion.div
            initial={{ opacity: 0.1, y: 15 }}
            animate={{ opacity: 0.2, y: -15 }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute overflow-hidden"
          >
            <MdKeyboardDoubleArrowUp className="text-blue-500 text-4xl" />
          </motion.div>
          <h1 className="text-gray-500 text-sm">پیش بینی سود</h1>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-[350px] max-w-none mx-auto bg-white shadow-sm rounded-xl border border-gray-100 mt-4 mb-4 "
      >
        <div className="p-4 text-center ">
          <h2 className="text-lg font-bold text-gray-700">{plan.plan.persian_name}</h2>
          <div className="flex justify-center flex justify-around">
            <p className="text-gray-600 text-[10px]">{plan.plan.industry_group_description}</p>
            <p className="text-gray-600 text-[10px]">{plan.plan.persian_suggested_symbol}</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="flex flex-row items-center justify-around w-[350px] mt-4 mb-4">
        <div className="flex flex-col items-center justify-center w-1/5">
          <div className="flex flex-row items-center w-full justify-around">
            <RiFundsFill className="text-gray-500 text-lg" />
            <div className="flex items-center">
              <h1 className="text-gray-500 text-xl font-bold">
                {plan.information_complete.period_length}
              </h1>
              <p className="text-gray-500 text-[12px]">ماهه</p>
            </div>
          </div>
          <h1 className="text-gray-500 text-[12px]">دوره طرح</h1>
        </div>
        {plan.information_complete.payment_date && plan.plan.approved_underwriting_start_date ? (
          <>
            <Divider orientation="vertical" flexItem />
            <div className="flex flex-col items-center justify-center w-1/5">
              <div className="flex flex-row items-center w-full justify-around">
                <RiCalendarScheduleFill className="text-gray-500 text-lg" />
                <div className="text-gray-500 text-xl font-bold">
                  <div className="flex items-center">
                    {Math.max(
                      1,
                      Math.ceil(
                        (new Date(plan.information_complete.payment_date) -
                          new Date(plan.plan.approved_underwriting_start_date)) /
                          (1000 * 60 * 60 * 24)
                      )
                    )}
                    <p className="text-gray-500 text-[12px]">روز</p>
                  </div>
                </div>
              </div>
              <h1 className="text-gray-500 text-[12px]">جمع‌آوری وجه</h1>
            </div>
          </>
        ) : null}
        <Divider orientation="vertical" flexItem />
        <div className="flex flex-col items-center justify-center w-1/5">
          <div className="flex flex-row items-center w-full justify-around">
            <HiCheckCircle className="text-gray-500 text-lg" />
            <div className="flex items-center">
              <h1
                className={`text-gray-500 ${
                  plan.information_complete.payback_period === '1' ? 'text-xl' : 'text-[12px]'
                } font-bold`}
              >
                {plan.information_complete.payback_period === '1' ? '3' : 'پایان طرح'}
              </h1>
              <p className="text-gray-500 text-[12px]">
                {plan.information_complete.payback_period === '1' ? 'ماهه' : ''}
              </p>
            </div>
          </div>
          <h1 className="text-gray-500 text-[12px]">پرداخت سود</h1>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="flex flex-col items-center justify-center w-1/5">
          <div className="flex flex-row items-center w-full justify-around">
            <BsPersonFillCheck className="text-gray-500 text-lg" />
            <div className="flex items-center">
              <h1 className="text-gray-500 text-xl font-bold">
                {plan.plan.number_of_finance_provider ?? 0}
              </h1>
              <p className="text-gray-500 text-[12px]">نفر</p>
            </div>
          </div>
          <h1 className="text-gray-500 text-[12px]">سرمایه گذاران</h1>
        </div>
      </motion.div>

      <div className="w-3/4 flex mb-1 justify-center items-center bg-gradient-to-b from-[#d7ffe8] to-[#c9f2da] border border-green-100 rounded-lg rounded-tr-none text-center mt-4 h-10 overflow-hidden">
        <p className="text-green-600 text-sm">{plan.appendices[0]?.title}</p>
      </div>
      <p className="text-gray-300 text-left text-xs">(بدون تضمین سود)</p>

      <div className="flex flex-col items-center justify-around w-[350px] mt-4 mb-8">
        <motion.div className="flex flex-row items-center justify-around w-full mt-4 mb-8">
          <div className="flex flex-col items-center justify-center w-1/2">
            <div className="flex flex-row items-center w-full justify-around">
              <h1 className="text-gray-500 text-[12px] font-bold">
                {plan.plan.total_price.toLocaleString() ?? 0}
              </h1>
            </div>
            <h1 className="text-gray-500 text-[12px] ">مبلغ مورد نیاز</h1>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="flex flex-col items-center justify-center w-1/2">
            <div className="flex flex-row items-center w-full justify-around">
              <h1 className="text-gray-500 text-[12px] font-bold">
                {plan?.information_complete?.amount_collected_now?.toLocaleString() ?? 0}
              </h1>
            </div>
            <h1 className="text-gray-500 text-[12px]">مبلغ تامین شده</h1>
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <GaugeComponent
            type="semicircle"
            emptyColor="#f0f0f0"
            animationDuration={10}
            arc={{
              padding: 0.02,
              subArcs: [
                {
                  limit: 10,
                  showTick: true,
                  color: '#5B86E5',
                  tooltip: {
                    text: 'تامین شده توسط سرمایه پذیر',
                  },
                },
                {
                  limit: 50,
                  showTick: true,

                  color: '#8EE0B3',
                },
                {
                  limit: 80,
                  showTick: true,
                  color: '#38C875',
                },
                {
                  limit: 90,
                  showTick: true,
                  color: '#1CAD5B',
                },
              ],
            }}
            pointer={{
              type: 'blob',
              animationDelay: 0,
              color: '#70655c',
              strokeWidth: 6,
            }}
            value={Math.round(
              ((plan?.information_complete?.amount_collected_now ?? 0) / plan.plan.total_price) *
                100
            )}
            min={0}
            max={100}
            labels={{
              valueLabel: {
                matchColorWithArc: true,
                formatTextValue: (value) => `${value}%`,
                style: {
                  fontSize: '35px',
                  textShadow: '2px 2px 4px rgba(85, 82, 82, 0.1)',
                  fontWeight: 'bold',
                  fontFamily: 'vazir',
                },
              },
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

PlanCart.propTypes = {
  handleDetailsClick: PropTypes.func.isRequired,
  key: PropTypes.string.isRequired,
  plan: PropTypes.object.isRequired,
};

export default PlanCart;
