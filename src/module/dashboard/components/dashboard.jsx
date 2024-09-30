import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="text-2xl font-bold text-gray-800 mb-6">داشبورد</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-start justify-between cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100">
          <div className="text-lg font-semibold text-gray-700">مانده کیف پول</div>
          <div className="text-3xl font-bold text-blue-500 mt-4">100,000,000,000</div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-start justify-between cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100">
          <div className="text-lg font-semibold text-gray-700">تعداد مشارکت ها</div>
          <div className="text-3xl font-bold text-green-500 mt-4">437</div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-start justify-between cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100">
          <div className="text-lg font-semibold text-gray-700">طرح های فعال</div>
          <div className="text-3xl font-bold text-yellow-500 mt-4">18</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
