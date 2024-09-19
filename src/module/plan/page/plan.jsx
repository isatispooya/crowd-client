/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import usePlan from '../service/use-plan';
import CommentForm from '../feature/comment';
import InvestProfile from '../feature/Investorprofile';
import Documentation from '../feature/documentation';
import Calculate from './calculate';
import Appendices from '../feature/appendices';
import Descript from '../feature/descript';
import Partner from '../feature/partner';
import Partnership from '../feature/partnership';

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
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="border-b-2 border-gray-200 mb-6">
        <ul className="flex justify-center space-x-6">
          {[
            { label: 'مشارکت', tab: 0 },
            { label: 'توضیحات', tab: 1 },
            { label: 'محاسبه‌گر سود', tab: 2 },
            { label: 'نظرات کاربران', tab: 3 },
            { label: 'مشخصات سرمایه‌گذارن', tab: 4 },
            { label: 'مستندات', tab: 5 },
            { label: 'تضامین', tab: 6 },
          ].map(({ label, tab }) => (
            <li key={tab} className="mr-4">
              <button
                className={`py-2 px-6 transition-all duration-300  ${
                  activeTab === tab
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4 bg-gray-50 rounded-lg shadow-md">
              <Partner />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-md">
              <Partnership />
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <Descript />
          </div>
        )}

        {activeTab === 2 && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <Calculate />
          </div>
        )}

        {activeTab === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <CommentForm />
          </div>
        )}

        {activeTab === 4 && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <InvestProfile />
          </div>
        )}

        {activeTab === 5 && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <Documentation />
          </div>
        )}

        {activeTab === 6 && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <Appendices />
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
