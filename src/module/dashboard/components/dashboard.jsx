import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import Loader from 'src/components/loader';
import AppWidgetSummary from 'src/sections/overview/app-widget-summary';

const Dashboard = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); 
  const access = getCookie('access');
  const navigate = useNavigate();
  useEffect(() => {
    if (!access) {
      navigate('/login');
    } else {
      setIsCheckingAuth(false);
    }
  }, [access, navigate]);
  if (isCheckingAuth) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="text-2xl font-bold text-gray-800 mb-6">داشبورد</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start justify-between">
          <div className="text-lg font-semibold text-gray-700">مانده کیف پول</div>
          <div className="text-3xl font-bold text-blue-500 mt-4">100,000,000,000</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start justify-between">
          <div className="text-lg font-semibold text-gray-700">تعداد مشارکت ها</div>
          <div className="text-3xl font-bold text-green-500 mt-4">437</div>
        </div>
        <AppWidgetSummary/>
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start justify-between">
          <div className="text-lg font-semibold text-gray-700">طرح های فعال</div>
          <div className="text-3xl font-bold text-yellow-500 mt-4">18</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-lg font-semibold text-gray-700 mb-4">گزارش ماهانه</div>
          <ul className="text-gray-600 space-y-3">
            <li>New Users: 245</li>
            <li>Total Revenue: $12,345</li>
            <li>Active Sessions: 56</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
