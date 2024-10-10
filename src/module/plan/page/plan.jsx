import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import usePlan from '../service/use-plan';
import CommentForm from '../comment/page/comment';
import InvestProfile from '../investor/feature/Investorprofile';
import Descript from '../feature/descript';
import Roadmap from '../feature/Roadmap';
import PaymentPage from '../payment/page/pymentpage';
import ReportsView from '../modules/reportsView';
import Calculate from '../feature/calculate';

const Plan = () => {
  const { traceCode } = useParams();
  const { isLoading, error, data } = usePlan(traceCode);
  const [activeTab, setActiveTab] = useState(0);
  const projectStatusId = data?.project_status_id;

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
            { label: 'نظرات کاربران', tab: 4, disabled: false },
            { label: 'مشخصات سرمایه‌گذارن', tab: 5, disabled: projectStatusId !== 2 }, // غیرفعال براساس وضعیت پروژه
            { label: 'زمان بندی طرح', tab: 6, disabled: projectStatusId !== 2 }, // غیرفعال براساس وضعیت پروژه
            { label: 'محاسبه گر سود', tab: 7, disabled: false },
            { label: 'مشارکت', tab: 8, disabled: false },
          ].map(({ label, tab, disabled }) => (
            <li key={tab} className="mb-2">
              <button
                type="button"
                className={`py-2 px-4 font-semibold transition-all duration-300 rounded-md ${
                  activeTab === tab
                    ? 'text-blue-900 border-b-4 border-blue-900'
                    : 'text-gray-600 hover:text-blue-900 hover:bg-gray-100'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !disabled && setActiveTab(tab)} // اگر غیرفعال نباشد، تب را تغییر دهد
                disabled={disabled} // غیرفعال کردن دکمه
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        {activeTab === 0 && <Descript />}
        {activeTab === 1 && <ReportsView />}
        {activeTab === 4 && <CommentForm />}
        {activeTab === 5 && <InvestProfile />}
        {activeTab === 6 && <Roadmap />}
        {activeTab === 7 && <Calculate />}
        {activeTab === 8 && <PaymentPage />}
      </div>
    </div>
  );
};

export default Plan;
