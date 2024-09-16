/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import { OnRun } from 'src/api/OnRun';
import usePlan from '../service/use-plan';
import Calender from './calculate';
import CommentForm from '../feature/comment';
import InvestProfile from '../feature/Investorprofile';

const Plan = () => {
  const { id } = useParams();
  const { data, isLoading, error } = usePlan(id);
  const [activeTab, setActiveTab] = useState(0);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">خطایی رخ داده است: {error.message}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4">
      <div className="border-b-2 border-gray-200 mb-6">
        <ul className="flex justify-center">
          <li className="mr-4">
            <button
              className={`py-2 px-4 ${
                activeTab === 0
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab(0)}
            >
              توضیحات
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
              محاسبه گر سود
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
              نظرات کاربران    
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
               مشخصات سرمایه گذارن    
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        {activeTab === 0 && (
          <div className="p-4 bg-gray-100 rounded-md shadow-inner">
           
            <div>
              <h3 className="text-xl font-bold mb-2">عنوان طرح:</h3>
              <p className="text-gray-700 mb-4">{data.plan_name}</p>

              <h3 className="text-xl font-bold mb-2">نام شرکت:</h3>
              <p className="text-gray-700 mb-4">{data.company_name}</p>
            </div>

            <p>
              {' '}
              <h3 className="text-xl font-bold mb-2">توضیحات:</h3>
              <p className="text-gray-700 mb-4">{data.description}</p>
            </p>
            <div className='flex justify-between'>
            <div> 
            <p className="text-base text-gray-800 mb-4">پیش‌بینی میزان سود: <span className="text-sm text-gray-600 font-semibold">{data.profit}</span></p>
          <p className="text-base text-gray-800 mb-4"> مبلغ سرمایه‌گذاری: <span className="text-sm text-gray-600 font-semibold">{data.funded_amount}</span></p>
          <p className="text-base text-gray-800 mb-4">  مدت زمان طرح: <span className="text-sm text-gray-600 font-semibold">{data.total_time}</span></p>
          <p className="text-base text-gray-800 mb-4">   حوزه فعالیت : <span className="text-sm text-gray-600 font-semibold">{data.activity_field}</span></p>
          <p className="text-base text-gray-800 mb-4">  نماد : <span className="text-sm text-gray-600 font-semibold">{data.symbol}</span></p>
          <p className="text-base text-gray-800 mb-4">   بازارگردان  : <span className="text-sm text-gray-600 font-semibold">{data.marketer}</span></p>
          <p className="text-base text-gray-800 mb-4">   درصدتامین متقاضی  : <span className="text-sm text-gray-600 font-semibold">{data.applicant_funding_percentage}</span></p>
          <p className="text-base text-gray-800 mb-4">   قیمت اسمی هر گواهی: <span className="text-sm text-gray-600 font-semibold">{data.nominal_price_certificate}</span></p>
          <p className="text-base text-gray-800 mb-4"> لینک فرابورس : <span className="text-sm text-gray-600 font-semibold">{data.farabours_link}</span></p>

</div>
              <div> <img
              src={`${OnRun}/${data.picture}`}
              alt={data.title}
              className="h-80 w-80 object-cover rounded-md"
            /></div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <Calender/>
        )}
         {activeTab === 2 && (
          <CommentForm/>
        )}
   
         {activeTab === 3 && (
          <InvestProfile/>
        )}
      </div>
    </div>
  );
};

export default Plan;
