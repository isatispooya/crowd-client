/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import usePlan from '../service/use-plan';

const Plan = () => {
  const  {id} = useParams()
  
  const { data, isLoading, error } = usePlan(id);
  const [activeTab, setActiveTab] = useState(0);
  

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4">
      <div className="border-b-2 border-gray-200">
        <ul className="flex justify-center">
            <li  className="mr-4">
              <button
                className={`py-2 px-4 ${
                  activeTab === 0
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab(0)}
              >توضیحات</button>
            </li>
            <li  className="mr-4">
              <button
                className={`py-2 px-4 ${
                  activeTab === 1
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab(1)}
              >محاسبه گر سود</button>
            </li>
        </ul>
      </div>

      <div className="mt-6">
        {
            activeTab === 0 && (
              <div  className="p-4 bg-gray-100 rounded-md shadow-inner">
                <p className="text-gray-700">yhy</p>
              </div>
            )
        }
        {
            activeTab === 1 && (
              <div  className="p-4 bg-gray-100 rounded-md shadow-inner">
                <p className="text-gray-700">trackingCode</p>
              </div>
            )
        }
      </div>
    </div>
  );
};

export default Plan;
