/* eslint-disable no-undef */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import { ToastContainer, toast } from 'react-toastify';
import SmallLoader from 'src/components/SmallLoader';
import ReferralCodeInput from './refferalView';
import useCaptcha from './hooks/useCaptcha';
import useApplyNationalCode from './hooks/postNationalCode';
import useSubmitOtp from './hooks/useSubmit';
import useTimer from './hooks/useTimer';

export default function LoginView() {
  const theme = useTheme();
  const [nationalCode, setNationalCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [otp, setOtp] = useState('');
  const [refferal, setRefferal] = useState('');
  const [registerd, setRegisterd] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { data: captchaData, refetch: refreshCaptcha, isLoading: isCaptchaLoading } = useCaptcha();
  const { mutate: applyNationalCode } = useApplyNationalCode();
  const { mutate: submitOtp, isLoading: loadingOtp } = useSubmitOtp(registerd);
  const { timer, step, setStep, startTimer } = useTimer();

  const handleApplyNationalCode = () => {
    if (captchaInput.length === 0) {
      toast.warning('کد تصویر صحیح نیست');
    } else if (nationalCode.length < 10 || nationalCode.length > 12) {
      toast.warning('مقدار کد ملی را به صورت صحیح وارد کنید');
    } else {
      setIsButtonDisabled(true);
      applyNationalCode(
        {
          nationalCode,
          captchaInput,
          encryptedResponse: captchaData?.encrypted_response,
        },
        {
          onSuccess: (data) => {
            setRegisterd(data.registered);
            setStep(2);

            startTimer();
            toast.success(data.message);
          },
          onError: () => {
            toast.error('خطا در ارسال درخواست');
          },
          onSettled: () => {
            setIsButtonDisabled(false);
          },
        }
      );
    }
  };

  const handleCode = () => {
    if (otp.length !== 5) {
      toast.warning('کد صحیح نیست');
    } else {
      submitOtp({
        nationalCode,
        otp,
      });
    }
  };

  const renderForm = (
    <>
      <ToastContainer autoClose={3000} />
      <Stack spacing={3} sx={{ mb: 3, width: '100%' }}>
        <TextField
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          label="شماره ملی"
          fullWidth
        />
        {step === 1 ? (
          <>
            <TextField
              onChange={(e) => setCaptchaInput(e.target.value)}
              label="کپچا"
              value={captchaInput}
              fullWidth
            />
            <Button onClick={refreshCaptcha} fullWidth>
              {isCaptchaLoading ? (
                <SmallLoader />
              ) : (
                <img src={`data:image/png;base64,${captchaData?.image}`} alt="captcha" />
              )}
            </Button>
            <Box sx={{ mb: 3 }} />
          </>
        ) : (
          <>
            <TextField
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              label="کد تایید"
              fullWidth
            />
            <ReferralCodeInput value={refferal} onChange={(e) => setRefferal(e.target.value)} />
          </>
        )}
      </Stack>

      {step === 1 ? (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
          onClick={handleApplyNationalCode}
          loading={isCaptchaLoading}
          disabled={isButtonDisabled}
        >
          تایید
        </LoadingButton>
      ) : (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleCode}
          loading={loadingOtp}
          disabled={isButtonDisabled}
        >
          تایید ({timer})
        </LoadingButton>
      )}
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Box>
        <ToastContainer />
        <Stack alignItems="center" justifyContent="center" sx={{ pt: 4, height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              ایساتیس کراد
            </Typography>
            <Typography
              sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
              variant="h6"
            >
              {' '}
              درگاه ورود ایساتیس کراد{' '}
            </Typography>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ورود
              </Typography>
            </Divider>
            {renderForm}
          </Card>
        </Stack>
      </Box>
      <Box sx={{ mt: 5, pb: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} تمامی حقوق توسعه اطلاعات مالی محفوظ است.
        </Typography>
        <a
          referrerPolicy="origin"
          target="_blank"
          href="https://trustseal.enamad.ir/?id=529924&Code=W3y39nx7isNrGWpAJBpNE2KanNerFkB8"
          rel="noreferrer"
        >
          <img
            referrerPolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=529924&Code=W3y39nx7isNrGWpAJBpNE2KanNerFkB8"
            alt=""
            style={{ cursor: 'pointer' }}
          />
        </a>
      </Box>
    </Box>
  );
}
