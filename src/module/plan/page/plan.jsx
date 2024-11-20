/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from 'src/components/loader';
import CommentForm from '../comment/page/comment';
import InvestProfile from '../investor/feature/Investorprofile';
import Descript from '../feature/descript';
import Roadmap from '../feature/Roadmap';
import PaymentPage from '../payment/page/pymentpage';
import ReportsView from '../modules/reportsView';
import Calculate from '../feature/calculate';
import InvestorPlan from '../investorPlan/InvestorPlan';
import useGetPlan from '../service/use-plan';
import Complaints from '../feature/Complaints';

const Plan = () => {
  const { traceCode } = useParams();
  const { isLoading, error, data } = useGetPlan(traceCode);
  const [activeTab, setActiveTab] = useState(0);
  const statusSecond = data?.information_complete?.status_second;
  const isPaymentDisabled = statusSecond !== '1';
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div className="text-red-500 text-center">خطایی رخ داده است: {error.message}</div>;
  }
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="border-b-2 border-gray-200 mb-6">
        <ul className="flex flex-wrap justify-center space-x-1 text-sm text-center">
          {[
            { label: 'اطلاعات طرح', tab: 0, disabled: false },
            { label: 'گزارشات', tab: 1, disabled: false },
            { label: 'نظرات کاربران', tab: 2, disabled: false },
            { label: 'مشخصات سرمایه‌گذارن', tab: 5, disabled: false },
            { label: 'زمان بندی طرح', tab: 6, disabled: false },
            { label: 'محاسبه گر سود', tab: 7, disabled: false },
            { label: 'شکایات', tab: 8, disabled: false },
            { label: 'سرمایه پذیر', tab: 9, disabled: false },
            { label: 'سرمایه گذاری', tab: 10, disabled: isPaymentDisabled },
          ].map(({ label, tab, disabled }) => (
            <motion.li
              key={tab}
              className="mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <button
                type="button"
                className={`py-2 px-4 font-semibold transition-all duration-300 rounded-md
                  ${
                    activeTab === tab
                      ? 'text-white bg-indigo-700 border-b-4 border-indigo-700'
                      : tab === 10
                      ? 'text-white bg-green-700 border-b-4 border-blue-700'
                      : ''
                  }
                  ${
                    disabled ? 'opacity-50 cursor-not-allowed' : tab === 10 ? 'cursor-pointer' : ''
                  }`}
                onClick={() => !disabled && setActiveTab(tab)}
                disabled={disabled}
              >
                {label}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        {activeTab === 0 && <Descript />}
        {activeTab === 1 && <ReportsView />}
        {activeTab === 2 && <CommentForm />}
        {activeTab === 5 && <InvestProfile />}
        {activeTab === 6 && <Roadmap />}
        {activeTab === 7 && <Calculate />}
        {activeTab === 8 && <Complaints />}
        {activeTab === 9 && <InvestorPlan />}
        {activeTab === 10 && !isPaymentDisabled && <PaymentPage />}
      </div>
    </div>
  );
};

export default Plan;
