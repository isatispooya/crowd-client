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

const steps = ['ثبت شرکت', 'ثبت هیئت مدیره', 'قرارداد عاملیت', 'اطلاعات تکمیلی'];

const CardsDetail = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { data: companyData } = useGetCompany(id);

  const isStepEditable = (stepNumber) => {
    const stepStatus = companyData?.investor_request?.[`step_${stepNumber + 1}`];
    return stepStatus === 'changed';
  };

  const handleStepClick = (index) => {
    if (
      isStepEditable(index) ||
      companyData?.investor_request?.[`step_${index + 1}`] === 'rejected' ||
      companyData?.investor_request?.[`step_${index + 1}`] === 'approved'
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
      {!isMobile && (
        <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', mb: 3 }}>
          {steps.map((label, index) => {
            const status = getStepStatus(index);
            const badge = getStatusBadge(status);

            return (
              <Step
                key={label}
                onClick={() => handleStepClick(index)}
                sx={{
                  cursor: 'pointer',
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
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      )}

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
            {steps.map((label, index) => (
              <MenuItem key={index} value={index}>
                {label}
              </MenuItem>
            ))}
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
        {activeStep === 0 && (
          <CompanyRegister companyId={id} readOnly={!isStepEditable(0)} status={getStepStatus(0)} />
        )}
        {activeStep === 1 && (
          <MembersInfo readOnly={!isStepEditable(1)} status={getStepStatus(1)} />
        )}
        {activeStep === 2 && <Contract readOnly={!isStepEditable(2)} status={getStepStatus(2)} />}
        {activeStep === 3 && <ExtraInfo readOnly={!isStepEditable(3)} status={getStepStatus(3)} />}
      </Box>
    </Box>
  );
};

export default CardsDetail;
