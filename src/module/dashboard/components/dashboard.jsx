import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col p-6 space-y-6">
      {/* Header Section */}
      <div className="text-2xl font-bold text-gray-800 mb-6">داشبورد</div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start justify-between">
          <div className="text-lg font-semibold text-gray-700">کاربران فعال</div>
          <div className="text-3xl font-bold text-blue-500 mt-4">1,245</div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start justify-between">
          <div className="text-lg font-semibold text-gray-700">گزارش سود های واریزی</div>
          <div className="text-3xl font-bold text-green-500 mt-4">$23,467</div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start justify-between">
          <div className="text-lg font-semibold text-gray-700">طرح های فعال</div>
          <div className="text-3xl font-bold text-yellow-500 mt-4">18</div>
        </div>
      </div>

      {/* Settings and Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Settings Box */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-lg font-semibold text-gray-700 mb-4">تنظیمات</div>
          <ul className="text-gray-600 space-y-3">
            <li>تنظیمات پروفایل</li>
            <li>تنظیمات طرح ها</li>
            <li>مدیریت اعلان ها</li>
          </ul>
        </div>

        {/* Stats Box */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-lg font-semibold text-gray-700 mb-4">گزارش ماهانه</div>
          <ul className="text-gray-600 space-y-3">
            <li>New Users: 245</li>
            <li>Total Revenue: $12,345</li>
            <li>Active Sessions: 56</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
