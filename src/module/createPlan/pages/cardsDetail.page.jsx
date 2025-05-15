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
import { ExtraInfo } from '../feature/step_4';
import { useGetCompany } from '../hooks';
import { Contract } from '../feature/step_3';
import { Payment } from '../feature/step_5';
import { AgancyContract } from '../feature/step_6';

const steps = [
  ' اطلاعات اولیه ',
  'ثبت هیئت مدیره',
  'اطلاعات تکمیلی',
  'اطلاعات قرارداد',
  'درگاه پرداخت',
  'قرارداد ',
];

const LockedStepMessage = () => (
  <Box sx={{ py: 4, textAlign: 'center' }}>
    <Typography
      variant="h6"
      color="success.main"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
    >
      این مرحله تایید شده است و امکان ویرایش وجود ندارد
    </Typography>
  </Box>
);

const CardsDetailPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { data: companyData } = useGetCompany(id);

  const isStepEditable = (stepNumber) => {
    const stepStatus = companyData?.investor_request?.[`step_${stepNumber + 1}`];
    return stepStatus === 'changed';
  };

  const isStepLocked = (stepNumber) => {
    if (stepNumber === steps.length - 1) {
      return false;
    }
    const stepStatus = companyData?.investor_request?.[`step_${stepNumber + 1}`];
    return stepStatus === 'approved';
  };

  const planName = companyData?.investor_request?.suggestion_plan_name;
  const comanyName = companyData?.investor_request?.company?.title;

  const handleStepClick = (index) => {
    const status = getStepStatus(index);
    if (
      index === steps.length - 1 ||
      (status !== 'pending' &&
        status !== 'approved' &&
        (isStepEditable(index) || status === 'rejected'))
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
        <h5 className="mb-2 font-bold text-black">
          {planName} _ {comanyName}
        </h5>
      </div>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', mb: 3 }}>
        {steps.map((label, index) => {
          const status = getStepStatus(index);
          const badge = getStatusBadge(status);
          const isPending = status === 'pending';
          const isLocked = status === 'approved' && index !== steps.length - 1;
          const isClickable = index === steps.length - 1 || (!isPending && !isLocked);

          return (
            <Step
              key={label}
              onClick={() => isClickable && handleStepClick(index)}
              sx={{
                cursor: isClickable ? 'pointer' : 'not-allowed',
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
              const isLocked = status === 'approved' && index !== steps.length - 1;
              const isDisabled = isPending || isLocked;

              return (
                <MenuItem
                  key={index}
                  value={index}
                  disabled={isDisabled}
                  sx={{
                    opacity: isDisabled ? 0.5 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
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
        {activeStep === 0 &&
          getStepStatus(0) !== 'pending' &&
          (isStepLocked(0) ? (
            <LockedStepMessage />
          ) : (
            <CompanyRegister
              companyId={id}
              readOnly={!isStepEditable(0)}
              status={getStepStatus(0)}
            />
          ))}
        {activeStep === 1 &&
          getStepStatus(1) !== 'pending' &&
          (isStepLocked(1) ? (
            <LockedStepMessage />
          ) : (
            <MembersInfo readOnly={!isStepEditable(1)} status={getStepStatus(1)} />
          ))}
        {activeStep === 2 &&
          getStepStatus(2) !== 'pending' &&
          (isStepLocked(2) ? (
            <LockedStepMessage />
          ) : (
            <Contract readOnly={!isStepEditable(2)} status={getStepStatus(2)} />
          ))}
        {activeStep === 3 &&
          getStepStatus(3) !== 'pending' &&
          (isStepLocked(3) ? (
            <LockedStepMessage />
          ) : (
            <ExtraInfo readOnly={!isStepEditable(3)} status={getStepStatus(3)} />
          ))}
        {activeStep === 4 &&
          getStepStatus(4) !== 'pending' &&
          (isStepLocked(4) ? (
            <LockedStepMessage />
          ) : (
            <Payment readOnly={!isStepEditable(4)} status={getStepStatus(4)} />
          ))}
        {activeStep === 5 &&
          getStepStatus(5) !== 'pending' &&
          (isStepLocked(5) ? (
            <LockedStepMessage />
          ) : (
            <AgancyContract readOnly={!isStepEditable(5)} status={getStepStatus(5)} />
          ))}
      </Box>
    </Box>
  );
};

export default CardsDetailPage;
