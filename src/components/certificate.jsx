import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactTabulator } from 'react-tabulator';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-tabulator/lib/styles.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-tabulator/css/tabulator_simple.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import usecertificate from '../hooks/use-certificate';
import Loader from './loader';

const columns = [
  { title: 'نام ', field: 'firstName', width: 100 },
  { title: 'نام خانوادگی', field: 'lastName', width: 120 },
  { title: 'مبلغ واحد', field: 'amount', hozAlign: 'center', sorter: 'number', formatter: 'money' },
  { title: 'مجموع مبلغ', field: 'total_amount', hozAlign: 'center', sorter: 'number', formatter: 'money' },  
  { title: 'دانلود گواهی مشارکت', field: 'link', width: 180 },
];

const Certificate = () => {
    const { id } = useParams();
    const { data: Data } = usecertificate(id);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); 
    const access = getCookie('access');
    const navigate = useNavigate();
    useEffect(() => {
      if (!access) {
        navigate('/login');
      } else {
        setIsCheckingAuth(false);
      }
    }, [access, navigate]);
  
    if (isCheckingAuth ) {
      return <Loader />;
    }
   
    const certificateData = Data ? Data.map(item => ({
      id: item.id,
      firstName : item.firstName,
      lastName : item.lastName,
      amount: item.amount,
      total_amount: item.total_amount,
      link: item.link,
    })) : [];
  
    return (
      <div className="w-full h-full">
        <ReactTabulator
          data={certificateData}
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
}
 
export default Certificate;
