import React, { useEffect } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { useAssets } from '../hooks';

const Assets = () => {
  const { data } = useAssets();

  useEffect(() => {}, [data]);

   const columns = [
    {
      title: 'نماد',
      field: 'symbol',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
    },
    {
      title: 'طرح',
      field: 'persian_name',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
    },
    {
      title: 'واحد',
      field: 'total_contribution_units',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
    },
    {
      title: 'مبلغ',
      field: 'contribution_payments',
      headerFilter: true,
      headerFilterPlaceholder: 'جستجو...',
      formatter: (cell) => {
        const value = cell.getValue();
        return value ? new Intl.NumberFormat('fa-IR').format(value) : '';
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

  if (!data) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="assets-container">
      <style>
        {`
          .assets-container {
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

export default Assets;
