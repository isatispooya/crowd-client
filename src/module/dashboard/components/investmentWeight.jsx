import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { useWeight } from '../hooks';

const InvestmentWeight = () => {
  const { data } = useWeight();

  const columns = [
    {
      title: 'طرح',
      field: 'plan_name',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
    },
    {
      title: 'مبلغ',
      field: 'amount_payment',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
      formatter: (cell) => {
        const value = cell.getValue();
        return value ? new Intl.NumberFormat('fa-IR').format(value) : '';
      },
    },
    {
      title: 'نرخ سود',
      field: 'interest_rate',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
      formatter: (cell) => {
        const value = cell.getValue();
        return value ? `${value}%` : '';
      },
    },
    {
      title: 'وزن',
      field: 'weight_plan_percent',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
      formatter: (cell) => {
        const value = cell.getValue();
        return value ? `${value}%` : '';
      },
    },
  ];

  const options = {
    layout: 'fitColumns',
    pagination: true,
    paginationSize: 5,
    paginationSizeSelector: [5, 10, 20],
    direction: 'rtl',
    responsiveLayout: false,
    headerSort: true,
    headerFilter: true,
    placeholder: 'هیچ داده‌ای موجود نیست',
    cssClass: 'custom-tabulator',
  };

  return (
    <div className="investment-weight-container">
      <style>
        {`
          .investment-weight-container {
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
      <ReactTabulator data={data} columns={columns} options={options} />
    </div>
  );
};

export default InvestmentWeight;
