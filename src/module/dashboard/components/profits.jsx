import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'tabulator-tables/dist/css/tabulator.min.css';
import 'tabulator-tables/dist/css/tabulator_materialize.min.css';
import { useProfit } from '../hooks';

const Profits = () => {
  const { data } = useProfit();

  const rows = (data || []).flatMap((item) =>
    (item.profits || []).map((profit) => ({
      plan: item.plan,
      date_operator: profit.date_operator,
      profit_amount: profit.profit_amount,
      profit_payment_completed: profit.profit_payment_completed,
    }))
  );

  const columns = [
    { title: 'طرح', field: 'plan', headerFilter: true, headerFilterPlaceholder: 'جستجو...' },
    {
      title: 'تاریخ',
      field: 'date_operator',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
      formatter: (cell) => {
        const value = cell.getValue();
        return value ? new Intl.DateTimeFormat('fa-IR').format(new Date(value)) : '';
      },
    },
    {
      title: 'مبلغ',
      field: 'profit_amount',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
      formatter: (cell) => {
        const value = cell.getValue();
        return value ? new Intl.NumberFormat('fa-IR').format(value) : '';
      },
    },
    {
      title: 'پرداخت',
      field: 'profit_payment_completed',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
      formatter: (cell) => (cell.getValue() ? 'پرداخت شده' : 'در انتظار'),
    },
  ];

  const options = {
    layout: 'fitColumns',
    pagination: true,
    paginationSize: 25,
    paginationSizeSelector: [25, 50, 100 , 150 , 200 , 500 , 1000],
    direction: 'rtl',
    responsiveLayout: false,
    headerSort: true,
    headerFilter: true,
    placeholder: 'هیچ داده‌ای موجود نیست',
    cssClass: 'custom-tabulator',
    theme: 'materialize',
  };

  if (!data) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="profits-container">
      <style>
        {`
          .profits-container {
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            width: 100%;
            overflow-x: auto;
          }
          .custom-tabulator {
            font-family: 'IRANSans', sans-serif;
            min-width: 600px;
            width: 100%;
          }
          @media (max-width: 900px) {
            .custom-tabulator {
              min-width: 500px;
            }
          }
          @media (max-width: 600px) {
            .custom-tabulator {
              min-width: 400px;
            }
          }
          .tabulator-header-filter input {
            padding: 6px;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            width: 100%;
          }
        `}
      </style>
      <ReactTabulator data={rows} columns={columns} options={options} />
    </div>
  );
};

export default Profits;
