import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatNumber } from 'src/utils/formatNumbers';
import {
  cardVariants,
  logoVariants,
  textVariants,
  badgeVariants,
  stepVariants,
} from '../../animations';
import { useAllCompany } from '../../hooks';
import { Nonlogo } from '../../assets';

const Cards = () => {
  const { data: allCompany } = useAllCompany();
  const navigate = useNavigate();

  const stepNames = ['ثبت شرکت', 'ثبت هیئت مدیره', 'قرارداد عاملیت', 'اطلاعات تکمیلی', 'تاییده'];

  const getFirstChangedStep = (request) => {
    const steps = [request.step_1, request.step_2, request.step_3, request.step_4, request.step_5];
    const changedIndex = steps.indexOf('changed');
    return changedIndex !== -1 ? { number: changedIndex + 1, name: stepNames[changedIndex] } : null;
  };

  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 p-2 md:p-4">
      {allCompany?.investor_requests?.map((request, index) => {
        const currentStep = getFirstChangedStep(request);

        return (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/cardsDetail/${request.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/cardsDetail/${request.id}`);
              }
            }}
            className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-gray-200 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative h-full"
          >
            <div className="absolute top-0 right-0 w-12 md:w-16 h-12 md:h-16 bg-gradient-to-bl from-purple-400 to-indigo-500 opacity-20 rounded-bl-full" />

            {currentStep && (
              <motion.div
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                className="absolute top-2 md:top-4 left-2 md:left-4 bg-yellow-400 text-white text-xs md:text-sm font-bold py-1 md:py-2 px-2 md:px-4 rounded-full shadow-md flex items-center gap-1 md:gap-2"
              >
                <span className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center bg-white text-yellow-600 rounded-full text-xs md:text-sm">
                  {currentStep.number}
                </span>
                <span className="hidden xs:inline">{currentStep.name}</span>
              </motion.div>
            )}

            <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-5 mt-6 md:mt-10">
              <motion.div variants={logoVariants} className="w-14 h-14 md:w-20 md:h-20 flex-shrink-0">
                <img
                  src={OnRun + request.logo}
                  alt="لوگوی طرح"
                  className="w-full h-full object-contain rounded-full border-2 border-purple-300 p-1 bg-white"
                  onError={(e) => {
                    e.target.src = Nonlogo;
                  }}
                />
              </motion.div>
              <motion.p
                variants={textVariants}
                className="text-lg md:text-xl font-bold text-indigo-800 truncate"
              >
                {request.suggestion_plan_name || 'طرح توسعه فناوری'}
              </motion.p>
            </div>

            <div className="space-y-2 md:space-y-4">
              <motion.div variants={badgeVariants} className="flex items-center justify-between">
                <p className="text-xs md:text-sm text-purple-600 font-medium">شماره شناسه شرکت:</p>
                <span className="text-xs md:text-sm font-semibold text-indigo-700 bg-indigo-100 px-2 md:px-3 py-1 rounded-full">
                  {request.company?.national_id || 'نامشخص'}
                </span>
              </motion.div>
              <motion.div variants={badgeVariants} className="flex items-center justify-between">
                <p className="text-xs md:text-sm text-purple-600 font-medium">مبلغ تامین مالی:</p>
                <span className="text-xs md:text-sm font-semibold text-green-700 bg-green-100 px-2 md:px-3 py-1 rounded-full">
                  {request.amount_of_investment
                    ? `${formatNumber(request.amount_of_investment)} ریال`
                    : 'نامشخص'}
                </span>
              </motion.div>
            </div>

            <motion.div
              className="mt-3 md:mt-5 text-center"
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs md:text-sm font-medium py-1.5 md:py-2 px-3 md:px-4 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
                مشاهده جزئیات
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

Cards.propTypes = {
  data: PropTypes.shape({
    companyId: PropTypes.string,
    amount: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    logo: PropTypes.string,
  }),
};

export default Cards;
