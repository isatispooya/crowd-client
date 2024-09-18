/* eslint-disable react/button-has-type */
import React from 'react';
import {  Grid, Typography } from '@mui/material';
import Loader from 'src/components/loader';
import CartPlan from './cartPlan';
import UsePlans from '../service/use-plans';





const CartPlans = () => {
  const {data,isLoading} = UsePlans()


  if (!data || data.length === 0 ) {
    return <p>هیچ درخواستی یافت نشد.</p>;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='grid grid-rows-1'>
    <Typography
      variant="h5"
      sx={{  textAlign: 'center', fontWeight: 'bold' }}
    >
      درخواست‌ها
    </Typography>
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
  
  );
};


export default CartPlans;
