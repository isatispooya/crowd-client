import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import { useParams } from 'react-router-dom';
import useGetInvesor from './service/use-getInvestor';

const columns = [
  { title: 'نام سرمایه گذار', field: 'name', width: 200 },
  { title: 'تاریخ ایجاد', field: 'create_date', hozAlign: 'center', width: 150 },
  { title: 'مبلغ واحد', field: 'amount', hozAlign: 'center', sorter: 'number', formatter: 'money' },
  { title: 'مجموع مبلغ', field: 'value', hozAlign: 'center', sorter: 'number', formatter: 'money' },
  { title: 'وضعیت', field: 'status', hozAlign: 'center', formatter: 'tickCross' },
  { title: 'پرداخت', field: 'payment_id', hozAlign: 'center', formatter: 'tickCross' },
];

const InvestProfile = () => {
  const { traceCode } = useParams();
  const { data } = useGetInvesor(traceCode);
  
  const transactionData = data
    ? data.map((item) => ({
        name: item.name,
        create_date: item.create_date,
        amount: item.amount,
        value: item.value,
        status: item.status,
        payment_id: item.payment_id === "True",
      }))
    : [];

  return (
    <div className="w-full h-full">
      <ReactTabulator
        data={transactionData}
        columns={columns}
        layout="fitDataFill"
        options={{
          pagination: 'local',
          paginationSize: 5,
          responsiveLayout: true,
        }}
        className="tabulator-table"
      />
    </div>
  );
};

export default InvestProfile;
