/* eslint-disable react/button-has-type */
import React from 'react';
import {  Grid, Typography } from '@mui/material';
import CartPlan from './cartPlan';
import UsePlan from '../service/use-plan';





const CartPlans = () => {
  const {data,isLoading} = UsePlan()


  if (!data || data.length === 0 ) {
    return <p>هیچ درخواستی یافت نشد.</p>;
  }
  if (isLoading) {
    return <p>isLoading.</p>;
  }


  return (
    <div className='grid grid-rows-1'>
    <Typography
      variant="h5"
      sx={{ marginBottom: '24px', textAlign: 'center', fontWeight: 'bold' }}
    >
      درخواست‌ها
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {data.map((item) => (
        <CartPlan
          key={item.id}
          id={item.id}
          title={item.title}
          trackingCode={item.trackingCode}
          createdDate={item.createdDate}
          handledDate={item.handledDate}
          status={item.status}
          expert={item.expert}
        />
      ))}
    </Grid>
  </div>
  
  );
};


export default CartPlans;
