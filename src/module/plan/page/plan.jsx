/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import usePlan from '../service/use-plan';
import CommentForm from '../comment/page/comment';
import InvestProfile from '../investor/feature/Investorprofile';
import Documentation from '../feature/documentation';

import Appendices from '../feature/appendices';
import Descript from '../feature/descript';
import Roadmap from '../feature/Roadmap';
import PaymentPage from '../payment/page/pymentpage';
import ReportsView from '../modules/reportsView';

const Plan = () => {
  const { traceCode } = useParams();
  const { isLoading, error } = usePlan(traceCode);
  const [activeTab, setActiveTab] = useState(0);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">خطایی رخ داده است: {error.message}</div>;
  }

  return (
    <div className="w-full  mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="border-b-2 border-gray-200 mb-6">
        <ul className="flex justify-center space-x-1 text-sm text-nowrap">
          {[
            { label: 'اطلاعات طرح', tab: 0 },
            { label: 'گزارشات', tab: 1 },

            { label: 'نظرات کاربران', tab: 4 },
            { label: 'مشخصات سرمایه‌گذارن', tab: 5 },

            { label: 'زمان بندی طرح', tab: 6 },
            { label: 'مشارکت', tab: 7 },
          ].map(({ label, tab }) => (
            <li key={tab} className="mr-4">
              <button
                className={`py-2 px-1 font-semibold transition-all duration-300 ${
                  label === 'مشارکت'
                    ? 'bg-blue-900 text-white rounded-sm'
                    : activeTab === tab
                    ? 'text-blue-900 border-b-4 border-blue-900 font-semibold'
                    : 'text-gray-600 hover:text-blue-900 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        {activeTab === 0 && (
          <div className="p-2 ">
            <Descript />
          </div>
        )}

        {activeTab === 1 && <ReportsView />}

        {activeTab === 4 && (
          <div className="p-2 bg-gray-50 rounded-lg shadow-md">
            <CommentForm />
          </div>
        )}

        {activeTab === 5 && (
          <div className="p-2 bg-gray-50 rounded-lg shadow-md">
            <InvestProfile />
          </div>
        )}

        {activeTab === 6 && (
          <div className="p-2 bg-gray-50 rounded-lg shadow-md">
            <Roadmap />
          </div>
        )}
        <div>
          {activeTab === 7 && (
            <div className="grid   gap-8">
              <PaymentPage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan;
