import { useState } from 'react';
import { Button, Card, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const PaymentContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '100px',
});

const StyledCard = styled(Card)({
  width: '100%',
  maxWidth: '800px',
  padding: '48px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  borderRadius: '16px',
});

const PaymentButton = styled(Button)({
  padding: '12px 24px',
  marginTop: '18px',
  borderRadius: '8px',
  fontWeight: 'bold',
});

const AmountDisplay = styled(Box)({
  background: '#f5f7ff',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '24px',
  textAlign: 'center',
});

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const amount = 1500000;

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('در حال انتقال به درگاه پرداخت...');
    }, 1500);
  };

  return (
    <PaymentContainer>
      <StyledCard>
        <Typography variant="h5" component="h2" gutterBottom align="center" fontWeight="bold">
          انتقال به درگاه پرداخت
        </Typography>

        <AmountDisplay>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            مبلغ قابل پرداخت
          </Typography>
          <Typography variant="h4" color="primary" fontWeight="bold">
            {amount.toLocaleString()} تومان
          </Typography>
        </AmountDisplay>

        <Typography variant="body2" gutterBottom>
          با پرداخت این مبلغ، طرح شما نهایی خواهد شد و می‌توانید آن را به صورت کامل مشاهده نمایید.
        </Typography>

        <PaymentButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'پرداخت و انتقال به درگاه بانکی'
          )}
        </PaymentButton>

        <Box mt={2} textAlign="center">
          <Typography variant="caption" color="textSecondary">
            با کلیک روی دکمه پرداخت، به درگاه امن بانکی منتقل خواهید شد.
          </Typography>
        </Box>
      </StyledCard>
    </PaymentContainer>
  );
};

export default Payment;
