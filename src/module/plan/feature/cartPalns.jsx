/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Grid} from '@mui/material';
import Loader from 'src/components/loader';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import CartPlan from './cartPlan';
import UsePlans from '../service/use-plans';

const CartPlans = () => {
  const { data, isLoading } = UsePlans();
  const access = getCookie('access');
  const navigate = useNavigate();
  useEffect(() => {
    if (!access) {
      navigate('/login');
    } 
  }, [access, navigate]);

 

  if (!data || data.length === 0) {
    return <p>هیچ درخواستی یافت نشد.</p>;
  }
  return (
    <div className="flex justify-center ">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-2xl p-6">
        <div className="bg-gray-200 text-white rounded-t-md p-4 text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-700">طرح ها</h1>
        </div>
        <Grid container spacing={4} justifyContent="center">
          {data.map((item) => (
            <CartPlan
              key={item.id}
              id={item.id}
              title={item.plan_name}
              totalTime={item.total_time}
              companyName={item.company_name}
              fundedAmount={item.funded_amount}
              profit={item.profit}
              paymentPeriod={item.payment_period}
              buoyancy={item.buoyancy}
              picture={item.picture}
              description={item.description}
              planStatus={item.plan_status}
              activityField={item.activity_field}
              remainingDays={item.remaining_days}
              marketer={item.marketer}
              symbol={item.symbol}
              faraboursLink={item.farabours_link}
              applicantFundingPercentage={item.applicant_funding_percentage}
              nominalPriceCertificate={item.nominal_price_certificate}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default CartPlans;
