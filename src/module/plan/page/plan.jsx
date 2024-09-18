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
    return <div className="text-red-500">خطایی رخ داده است: {error.message}</div>;
  }
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="border-b-2 border-gray-200 mb-6">
        <ul className="flex justify-center">
          <li className="mr-4">
            <button
              className={`py-2 px-4 ${
                activeTab === 0
                  ? 'text-blue-900 border-b-2 border-blue-900'
                  : 'text-gray-900 hover:text-blue-900'
              }`}
              onClick={() => setActiveTab(0)}
            >
              مشارکت
            </button>
          </li>
          <li className="mr-4">
            <button
              className={`py-2 px-4 ${
                activeTab === 1
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab(1)}
            >
              توضیحات
            </button>
          </li>
          <li className="mr-4">
            <button
              className={`py-2 px-4 ${
                activeTab === 2
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab(2)}
            >
              محاسبه گر سود
            </button>
          </li>
          <li className="mr-4">
            <button
              className={`py-2 px-4 ${
                activeTab === 3
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab(3)}
            >
              نظرات کاربران{' '}
            </button>
          </li>
          <li className="mr-4">
            <button
              className={`py-2 px-4 ${
                activeTab === 4
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab(4)}
            >
              مشخصات سرمایه گذارن
            </button>
          </li>
          <li className="mr-4">
            <button
              className={`py-2 px-4 ${
                activeTab === 5
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab(5)}
            >
              مستندات
            </button>
          </li>
          <li className="mr-4">
            <button
              className={`py-2 px-4 ${
                activeTab === 6
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab(6)}
            >
              تضامین
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-6">
        {activeTab === 0 && (
          <div className="flex justify-evenly">
            <div >
              <Partner />
            </div>
            <div >
              <Partnership />
            </div>
          </div>
        )}
        {activeTab === 1 && <Descript />}

        {activeTab === 2 && <Calculate />}
        {activeTab === 3 && <CommentForm />}

        {activeTab === 4 && <InvestProfile />}
        {activeTab === 5 && <Documentation />}
        {activeTab === 6 && <Appendices />}
      </div>
    </div>
  );
};

export default Plan;
