import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import CompanyRegister from '../feature/step_1/registerCompany/companyRegister.feat';
import MembersInfo from '../feature/step_2/membersInfo';
import { Contract } from '../feature/step_3';
import { ExtraInfo } from '../feature/step_4';
import { useGetCompany } from '../hooks';

const steps = ['ثبت شرکت', 'ثبت هیئت مدیره', 'قرارداد عاملیت', 'اطلاعات تکمیلی' , 'درگاه پرداخت' , 'قرارداد'];

const CardsDetailPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { data: companyData } = useGetCompany(id);

  const isStepEditable = (stepNumber) => {
    const stepStatus = companyData?.investor_request?.[`step_${stepNumber + 1}`];
    return stepStatus === 'changed';
  };

  const planName = companyData?.investor_request?.suggestion_plan_name;

  const handleStepClick = (index) => {
    const status = getStepStatus(index);
    if (
      status !== 'pending' &&
      (isStepEditable(index) || status === 'rejected' || status === 'approved')
    ) {
      setActiveStep(index);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const getStepStatus = (index) => {
    return companyData?.investor_request?.[`step_${index + 1}`] || 'changed';
  };

  const getStatusBadge = (status) => {
    if (status === 'approved') {
      return {
        label: 'تایید شده',
        color: 'success.main',
        bgColor: 'success.light',
        icon: '✓',
      };
    }

    if (status === 'rejected') {
      return {
        label: 'رد شده',
        color: 'error.main',
        bgColor: 'error.light',
        icon: '✗',
      };
    }

    if (status === 'pending') {
      return {
        label: 'ایجاد نشده',
        color: 'primary.main',
        bgColor: 'primary.light',
        icon: '⟳',
      };
    }

    return {
      label: 'در حال بررسی',
      color: 'primary.main',
      bgColor: 'primary.light',
      icon: '⟳',
    };
  };

  return (
    <Box
      sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div className="w-full flex flex-col items-center rounded-md transition-shadow hover:shadow-lg">
        <h5 className="mb-2 font-bold text-black">{planName}</h5>
      </div>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', mb: 3 }}>
        {steps.map((label, index) => {
          const status = getStepStatus(index);
          const badge = getStatusBadge(status);
          const isPending = status === 'pending';

          return (
            <Step
              key={label}
              onClick={() => !isPending && handleStepClick(index)}
              sx={{
                cursor: isPending ? 'not-allowed' : 'pointer',
                opacity: isPending ? 0.5 : 1,
                '& .MuiStepLabel-root': {
                  color: badge.color,
                },
              }}
            >
              <StepLabel
                StepIconProps={{
                  sx: {
                    color: badge.color,
                    '&.Mui-active': { color: badge.color },
                    '&.Mui-completed': { color: badge.color },
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    filter: isPending ? 'grayscale(1)' : 'none',
                  }}
                >
                  {label}
                  <Box
                    sx={{
                      mt: 0.5,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      fontSize: '0.7rem',
                      backgroundColor: badge.bgColor,
                      color: badge.color,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <span>{badge.icon}</span>
                    <span>{badge.label}</span>
                  </Box>
                </Box>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {isMobile && (
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            bgcolor: '#fff',
            color: 'white',
          }}
        >
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', color: 'black' }}>
            مرحله فعلی:
          </Typography>
          <Select
            value={activeStep}
            onChange={(event) => handleStepClick(event.target.value)}
            displayEmpty
            fullWidth
            variant="outlined"
            sx={{
              bgcolor: 'white',
              color: 'black',
              fontWeight: 'bold',
              borderRadius: 2,
              mb: 1,
            }}
          >
            {steps.map((label, index) => {
              const status = getStepStatus(index);
              const isPending = status === 'pending';

              return (
                <MenuItem
                  key={index}
                  value={index}
                  disabled={isPending}
                  sx={{
                    opacity: isPending ? 0.5 : 1,
                    cursor: isPending ? 'not-allowed' : 'pointer',
                  }}
                >
                  {label}
                </MenuItem>
              );
            })}
          </Select>

          <MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            sx={{ bgcolor: 'transparent' }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
                sx={{ color: 'black' }}
              >
                بعدی
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ color: 'black' }}
              >
                قبلی
              </Button>
            }
          />
        </Paper>
      )}

      <Box sx={{ mt: 3, textAlign: 'center', width: '100%' }}>
        {activeStep === 0 && getStepStatus(0) !== 'pending' && (
          <CompanyRegister companyId={id} readOnly={!isStepEditable(0)} status={getStepStatus(0)} />
        )}
        {activeStep === 1 && getStepStatus(1) !== 'pending' && (
          <MembersInfo readOnly={!isStepEditable(1)} status={getStepStatus(1)} />
        )}
        {activeStep === 2 && getStepStatus(2) !== 'pending' && (
          <Contract readOnly={!isStepEditable(2)} status={getStepStatus(2)} />
        )}
        {activeStep === 3 && getStepStatus(3) !== 'pending' && (
          <ExtraInfo readOnly={!isStepEditable(3)} status={getStepStatus(3)} />
        )}
        {activeStep === 4 && getStepStatus(4) !== 'pending' && (
          <Payment readOnly={!isStepEditable(4)} status={getStepStatus(4)} />
        )}
        {activeStep === 5 && getStepStatus(5) !== 'pending' && (
          <Contract readOnly={!isStepEditable(5)} status={getStepStatus(5)} />
        )}
      </Box>
    </Box>
  );
};

export default CardsDetailPage;
