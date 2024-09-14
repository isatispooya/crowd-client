/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Card, CardContent, Grid, Typography, CardActions } from '@mui/material';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // باید مطمئن شوید که این کامپوننت نصب شده است
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useNavigate } from 'react-router-dom';

const CartPlan = ({id, status, expert, title, createdDate, handledDate, trackingCode }) => {
    const navigate = useNavigate ();
  const getStatusIcon = (status) => {
    if (status === 'تکمیل شده') {
      return <CheckCircleIcon sx={{ color: 'green', marginLeft: '8px' }} />;
    }
    return <HourglassEmptyIcon sx={{ color: 'orange', marginLeft: '8px' }} />;
  };

  const getCardColor = (status) => status === 'تکمیل شده' ? 'green' : 'orange';
  const handleViewClick = () => {
    navigate(`/plan/${id}`); 
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          padding: '16px',
          borderRadius: '14px',
          border: '8px solid',
          borderColor: getCardColor(status),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '450px',
          maxWidth: '280px',
        }}
      >
        <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              marginBottom: '16px',
            }}
          >
            {`عنوان: ${title}`}
          </Typography>
          <Typography variant="h6" color="primary">
            {`کد پیگیری: ${trackingCode}`}
          </Typography>
          <Typography sx={{ color: 'gray', marginTop: '8px' }}>
            {`تاریخ ایجاد: ${createdDate}`}
          </Typography>
          <Typography sx={{ color: 'gray', marginTop: '8px' }}>
            {`تاریخ رسیدگی: ${handledDate}`}
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: status === 'تکمیل شده' ? 'green' : 'orange',
              marginTop: '8px',
            }}
          >
            {getStatusIcon(status)}
            {`وضعیت: ${status}`}
          </Typography>
          <Typography sx={{ marginTop: '8px' }}>{`کارشناس: ${expert}`}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <button onClick={handleViewClick} className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg">
            مشاهده
          </button>
        </CardActions>
      </Card>
    </Grid>
  );
};

CartPlan.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  expert: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  handledDate: PropTypes.string.isRequired,
  trackingCode: PropTypes.string.isRequired,
};

export default CartPlan;
