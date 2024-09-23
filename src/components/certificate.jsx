import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactTabulator } from 'react-tabulator';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-tabulator/lib/styles.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-tabulator/css/tabulator_simple.min.css';
import { useParams } from 'react-router-dom';
import usecertificate from '../hooks/use-certificate';

const columns = [
  { title: 'طرح', field: 'plan', width: 150 },
  { title: 'تعداد ', field: 'number', hozAlign: 'center', width: 150 },
  { title: ' دانلود', field: 'file', hozAlign: 'center', sorter: 'number', formatter: 'file' },
];

const Certificate = () => {
  const { id } = useParams();
  const { data: Data } = usecertificate(id);

  const transactionData = Data
    ? Data.map((item) => ({
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

export default Certificate;
