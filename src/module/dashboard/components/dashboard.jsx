import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const data = [
  {
    title: 'تعداد طرح ها',
    total: 2500,
    icon: <InsertDriveFileIcon style={{ fontSize: '2rem' }} className="text-green-500" />,
  },
  {
    title: 'تعداد طرح های فعال',
    total: 15000000,
    icon: <AssignmentTurnedInIcon style={{ fontSize: '2rem' }} className="text-yellow-500" />,
  },
  {
    title: 'تعداد مشارکت کاربر ',
    total: 30000,
    icon: <PeopleIcon style={{ fontSize: '2rem' }} className="text-red-500" />,
  },
  {
    title: 'مبلغ مشارکت کاربر ',
    total: 306330,
    icon: <MonetizationOnIcon style={{ fontSize: '2rem' }} className="text-red-500" />,
  },
];

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mb-24 mx-auto w-full px-4 md:px-6">
      {data.map((widget, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-2xl shadow-lg flex items-center justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
        >
          <div className="w-20 h-20 flex items-center justify-center">
            {widget.icon}
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold">{widget.total.toLocaleString()}</div>
            <div className="text-gray-600 text-lg">{widget.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
