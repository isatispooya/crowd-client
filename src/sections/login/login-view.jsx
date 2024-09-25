/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { setCookie } from 'src/api/cookie';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { OnRun } from 'src/api/OnRun';
import { ToastContainer, toast } from 'react-toastify';
import ReferralCodeInput from './refferalView';
import useCaptcha from './hooks/useCaptcha';
import useApplyNationalCode from './hooks/postNationalCode';
import useSubmitOtp from './hooks/useSubmit';
// import useApplyNationalCode from './hooks/postNationalCode';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [nationalCode, setNationalCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [otp, setOtp] = useState('');
  const [refferal, setRefferal] = useState('');
  const [step, setStep] = useState(1);
  const [registerd, setRegisterd] = useState(false);
  const [timer, setTimer] = useState(60);

  const { data: captchaData, refetch: refreshCaptcha, isLoading: isCaptchaLoading } = useCaptcha();
  const { mutate: applyNationalCode } = useApplyNationalCode();
  const { mutate: submitOtp, isLoading: loadingOtp } = useSubmitOtp(registerd);
  const handleApplyNationalCode = () => {
    if (captchaInput.length === 0) {
      toast.warning('کد تصویر صحیح نیست');
    } else if (nationalCode.length !== 10) {
      toast.warning('مقدار کد ملی را به صورت صحیح وارد کنید');
    } else {
      applyNationalCode({
        nationalCode,
        captchaInput,
        encryptedResponse: captchaData?.encrypted_response,
      }, {
        onSuccess: (data) => {
          setStep(2);
          setTimer(60);
          toast.success(data.message);
        },
      });
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

  // const applyNationalCode = () => {
  //   if (captchaInput.length === 0) {
  //     toast.warning('کد تصویر صحیح نیست');
  //   } else if (nationalCode.length !== 10) {
  //     toast.warning('مقدار کد ملی را به صورت صحیح وارد کنید');
  //   } else {
  //     setLoading(true);
  //     axios({
  //       method: 'POST',
  //       url: `${OnRun}/api/otp/`,
  //       data: {
  //         uniqueIdentifier: nationalCode,
  //         encrypted_response: captchaData?.encrypted_response,
  //         captcha: captchaInput,
  //       },
  //     })
  //       .then((response) => {
  //         toast.success(response.data.message);
  //         setRegisterd(response.data.registered);
  //         setStep(2);
  //         setTimer(60);
  //       })
  //       .catch((err) => {
  //         console.error('خطا:', err);
  //         toast.error('خطا در ارسال درخواست به سرور.');
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // };
  // const handleCode = () => {
  //   if (otp.length !== 5) {
  //     toast.warning('کد صحیح نیست');
  //   } else {
  //     setLoading(true);
  //     const url_ = registerd ? `${OnRun}/api/login/` : `${OnRun}/api/signup/`;
  //     axios({
  //       method: 'POST',
  //       url: url_,
  //       data: { uniqueIdentifier: nationalCode, otp },
  //     })
  //       .then((response) => {
  //         setCookie('access', response.data.access, 5);
  //         toast.success('ورود با موفقیت انجام شد');
  //         if (registerd) {
  //           router.push('/');
  //         } else {
  //           router.push('/ProfilePage');
  //         }
  //         toast.warning(response.data.message);
  //       })
  //       .catch((err) => {
  //         console.error('خطا:', err);
  //         toast.error('خطا در ارسال درخواست به سرور.');
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // };
  useEffect(() => {
    let countdown;
    if (step === 2) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setStep(1);
            setOtp('');
            setTimer(60);
            toast.info('زمان وارد کردن کد تایید به پایان رسید. لطفاً دوباره تلاش کنید.');
            return 60;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [step]);

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
                'Loading...'
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
      </Box>
    </Box>
  );
}
