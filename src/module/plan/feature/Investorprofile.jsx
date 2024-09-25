import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import { useParams } from 'react-router-dom';
import usepartner from '../service/use-participant';

const columns = [
  { title: 'نام سرمایه گذار', field: 'lastName', width: 150 },
  { title: 'تعداد مشارکت‌کنندگان', field: 'participant', hozAlign: 'center', width: 150 },
  { title: 'مبلغ واحد', field: 'amount', hozAlign: 'center', sorter: 'number', formatter: 'money' },
  {
    title: 'مجموع مبلغ',
    field: 'total_amount',
    hozAlign: 'center',
    sorter: 'number',
    formatter: 'money',
  },
];

const InvestProfile = () => {
  const { id } = useParams();
  const { data: partnerData } = usepartner(id);

  const transactionData = partnerData
    ? partnerData.map((item) => ({
        id: item.id,
        lastName: item.lastName,
        amount: item.amount,
        total_amount: item.total_amount,
        participant: item.participant,
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
