import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import usePeyment from '../../hooks/step_5/usePeyment';
import { useGetCompany } from '../../hooks';

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

const SuccessMessage = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px',
  background: '#e8f5e9',
  borderRadius: '8px',
  marginTop: '16px',
  marginBottom: '16px',
});

const Payment = () => {
  const { id } = useParams();
  const { data } = useGetCompany(id);

  const { mutate: postPeyment } = usePeyment();
  const [loading, setLoading] = useState(false);

  if (data?.investor_request) {
    console.log(data.investor_request.status_payment);
  }

  const handlePayment = () => {
    if (data?.investor_request?.id) {
      setLoading(true);
      postPeyment(
        { investor_request_id: data.investor_request.id },
        {
          onSuccess: (responseData) => {
            if (responseData && responseData.url) {
              window.location.href = `https://findev.isatispooya.com/peymentpage?url=${responseData.url}`;
            }
          },
          onSettled: () => setLoading(false),
        }
      );
    }
  };

  if (!data || !data.investor_request) {
    return (
      <PaymentContainer>
        <StyledCard>
          <Box display="flex" justifyContent="center" alignItems="center" p={4}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              در حال بارگذاری اطلاعات...
            </Typography>
          </Box>
        </StyledCard>
      </PaymentContainer>
    );
  }

  return (
    <PaymentContainer>
      {data.investor_request.status_payment === true ? (
        <StyledCard>
          <Typography variant="h5" component="h2" gutterBottom align="center" fontWeight="bold">
            انتقال به درگاه پرداخت
          </Typography>

          {data.investor_request.code_status_payment === 'success' ? (
            <SuccessMessage>
              <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h6" gutterBottom color="success.main" fontWeight="bold">
                پرداخت با موفقیت انجام شده است
              </Typography>
              <Typography variant="body2" align="center">
                طرح شما با موفقیت نهایی شده است و اکنون می‌توانید آن را به صورت کامل مشاهده نمایید.
              </Typography>
            </SuccessMessage>
          ) : (
            <>
              <AmountDisplay>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  مبلغ قابل پرداخت
                </Typography>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {data.investor_request.amount_of_payment?.toLocaleString() || '0'} ریال
                </Typography>
              </AmountDisplay>
              <Typography variant="body2" gutterBottom>
                با پرداخت این مبلغ، طرح شما نهایی خواهد شد و می‌توانید آن را به صورت کامل مشاهده
                نمایید.
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
            </>
          )}
        </StyledCard>
      ) : (
        <StyledCard>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            align="center"
            fontWeight="bold"
            color="error"
          >
            امکان پرداخت برای شما وجود ندارد
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            امکان پرداخت از طرح مدیری سیستم برای شما غیر فعال است
          </Typography>
        </StyledCard>
      )}
    </PaymentContainer>
  );
};

export default Payment;
