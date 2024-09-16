import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactTabulator } from 'react-tabulator';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-tabulator/lib/styles.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-tabulator/css/tabulator_simple.min.css';

const transactionData = [
  { id: 1, name:'محمدی', units: 100, amount: '20000' },
  { id: 2, name:'کریمی', units: 200, amount: '40000' },
  { id: 3, name:"کریمیان" , units: 150, amount: '30000' },
];
const columns = [
  { title: ' نام سرمایه گذار', field: 'id', width: 150 },
  { title: ' نام سرمایه گذار', field: 'name', width: 150 },
  { title: 'تعداد واحد', field: 'units', hozAlign: 'center', sorter: 'date' },
  { title: 'مبلغ سرمایه گذاری', field: 'amount', hozAlign: 'center', formatter: 'money' },
];

const InvestProfile = () => {
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

export default InvestProfile;
