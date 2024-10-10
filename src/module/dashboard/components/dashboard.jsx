import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { formatNumber } from 'src/utils/formatNumbers';
import useGetDashbord from './service/use-getDashbord';

const Dashboard = () => {
  const { data: dashbord } = useGetDashbord();

  if (!dashbord) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-bold"> تعداد طرح ها</h2>
        <InsertDriveFileIcon style={{ fontSize: '2rem' }} color="primary" />
        <p className="text-2xl">{dashbord["all plan"]}</p>
      </div>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-bold"> تعداد طرح های فعال</h2>
        <AssignmentTurnedInIcon style={{ fontSize: '2rem' }} color="error"/>
        <p className="text-2xl">{dashbord["active plan"]}</p>
      </div>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-bold"> تعداد مشارکت کاربر</h2>
        <PeopleIcon style={{ fontSize: '2rem' }} color="secondary" />
        <p className="text-2xl">{dashbord["participant plan"]}</p>
      </div>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-bold"> مبلغ مشارکت کاربر</h2>
        <MonetizationOnIcon style={{ fontSize: '2rem' }} color="success" />
        <p className="text-2xl">{formatNumber(dashbord["total value"])}</p>
      </div>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-bold">سود</h2>
        <TrendingUpIcon style={{ fontSize: '2rem' }} color="warning" />
        <p className="text-2xl">%{dashbord["all rate of return"]/100}</p>
      </div>
    </div>
  );
};

export default Dashboard;
