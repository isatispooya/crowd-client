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
  const { isLoading, error } = usePlan(traceCode);
  const [activeTab, setActiveTab] = useState(0);

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
            { label: 'اطلاعات طرح', tab: 0 },
            { label: 'گزارشات', tab: 1 },
            { label: 'نظرات کاربران', tab: 4 },
            { label: 'مشخصات سرمایه‌گذارن', tab: 5 },
            { label: 'زمان بندی طرح', tab: 6 },
            { label: 'محاسبه گر سود', tab: 7 },
            { label: 'مشارکت', tab: 8 },
          ].map(({ label, tab }) => (
            <li key={tab} className="mb-2">
              <button
                type="button"
                className={`py-2 px-4 font-semibold transition-all duration-300 rounded-md ${
                  // eslint-disable-next-line no-nested-ternary
                  label === 'مشارکت'
                    ? 'bg-blue-900 text-white'
                    : activeTab === tab
                    ? 'text-blue-900 border-b-4 border-blue-900'
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
          <div>
            <Descript />
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <ReportsView />
          </div>
        )}

        {activeTab === 4 && (
          <div>
            <CommentForm />
          </div>
        )}

        {activeTab === 5 && (
          <div>
            <InvestProfile />
          </div>
        )}

        {activeTab === 6 && (
          <div>
            <Roadmap />
          </div>
        )}

        {activeTab === 7 && (
          <div>
            <Calculate />
          </div>
        )}

        {activeTab === 8 && (
          <div>
            <PaymentPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
