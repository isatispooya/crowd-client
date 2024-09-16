import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactTabulator } from 'react-tabulator';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-tabulator/lib/styles.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-tabulator/css/tabulator_simple.min.css';

const transactionData = [
  { id: 1, date: '2024-09-01', amount: 100, status: 'Completed' },
  { id: 2, date: '2024-09-05', amount: 200, status: 'Pending' },
  { id: 3, date: '2024-09-10', amount: 150, status: 'Failed' },
];
const columns = [
  { title: 'Transaction ID', field: 'id', width: 150 },
  { title: 'Date', field: 'date', hozAlign: 'left', sorter: 'date' },
  { title: 'Amount', field: 'amount', hozAlign: 'right', formatter: 'money' },
  { title: 'Status', field: 'status', hozAlign: 'center' },
];

const TranHistory = () => {
  return (
    <div
    className='w-full h-full'
    >
      <ReactTabulator
        data={transactionData}
        columns={columns}
        layout="fitDataFill"
        options={{
          pagination: 'local',
          paginationSize: 5,
          responsiveLayout: true,
        }}
        className="tabulator-table "
      />
    </div>
  );
};

export default TranHistory;
