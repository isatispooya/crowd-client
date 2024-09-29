/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import Participation from 'src/pages/participation';
import usePlan from '../service/use-plan';
import CommentForm from '../feature/comment';
import InvestProfile from '../feature/Investorprofile';
import Documentation from '../feature/documentation';
import Calculate from './calculate';
import Appendices from '../feature/appendices';
import Descript from '../feature/descript';
import Roadmap from '../feature/Roadmap';

const Plan = () => {
  const { id } = useParams();
  const { isLoading, error } = usePlan(id);
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
            { label: ' مستندات طرح', tab: 1 },
            { label: 'تضامین و گزارشات اعتباری', tab: 2 },
            { label: ' تب جدید گزارشات ', tab: 3 },
            { label: 'تخلفات', tab: 4 },
            { label: 'نظرات کاربران', tab: 5 },
            { label: 'مشخصات سرمایه‌گذارن', tab: 6 },
            { label: 'محاسبه‌گر سود', tab: 7 },
            { label: 'زمان بندی طرح', tab: 8 },
            { label: 'مشارکت', tab: 9 },
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
          <div className="p-2 bg-gray-50 rounded-lg shadow-md">
            <Descript />
          </div>
        )}

        {activeTab === 1 && (
          <div className="p-2 bg-gray-50 rounded-lg shadow-md">
            <Documentation />
          </div>
        )}

        {activeTab === 2 && (
          <div className="p-2 bg-gray-50 rounded-lg shadow-md">
            <Appendices />
          </div>
        )}

        {activeTab === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">سیصبییلتنااتال</div>
        )}

        {activeTab === 4 && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">تخلفات</div>
        )}
        {activeTab === 5 && (
          <div className="p-2 bg-gray-50 rounded-lg shadow-md">
            <CommentForm />
          </div>
        )}

        {activeTab === 6 && (
          <div className="p-2 bg-gray-50 rounded-lg shadow-md">
            <InvestProfile />
          </div>
        )}
        {activeTab === 7 && (
          <div className="p-2 bg-gray-50 rounded-lg shadow-md">
            <Calculate />
          </div>
        )}
        {activeTab === 8 && (
          <div className="p-2 bg-gray-50 rounded-lg shadow-md">
            <Roadmap />
          </div>
        )}
        <div>
          {activeTab === 9 && (
            <div className="grid   gap-8">
              <Participation />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan;
