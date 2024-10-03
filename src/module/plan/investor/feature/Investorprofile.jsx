import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import { useParams } from 'react-router-dom';
import moment from 'jalali-moment';
import useGetInvesor from './service/use-getInvestor';

const columns = [
  { title: 'نام سرمایه گذار', field: 'name', width: 100 },
  { title: 'تاریخ ایجاد', field: 'create_date', hozAlign: 'center',width: 100  },
  { title: 'مبلغ واحد', field: 'amount', hozAlign: 'center', sorter: 'number', formatter: 'money' ,width: 100 },
  { title: 'مجموع مبلغ', field: 'value', hozAlign: 'center', sorter: 'number', formatter: 'money',width: 100  },
  { title: 'وضعیت', field: 'status', hozAlign: 'center', formatter: 'tickCross',width: 100  },
  { title: 'پرداخت', field: 'payment_id', hozAlign: 'center', formatter: 'tickCross',width: 100 },
];

const InvestProfile = () => {
  const { traceCode } = useParams();
  const { data } = useGetInvesor(traceCode);

  const transactionData = data
    ? data.map((item) => ({
        name: item.name,
        create_date: moment(item.create_date).locale('fa').format('YYYY/MM/DD'),
        amount: item.amount,
        value: item.value,
        status: item.status,
        payment_id: item.payment_id === 'True',
      }))
    : [];

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center">پروفایل سرمایه‌گذاران</h1>
      
      <div className="overflow-x-auto">
        <ReactTabulator
          data={transactionData}
          columns={columns}
          layout="fitData"
          options={{
            pagination: 'local',
            paginationSize: 5,
            responsiveLayout: 'collapse',
          }}
          className="tabulator-table"
        />
      </div>
    </div>
  );
};

export default InvestProfile;
