import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import InformationRecording from '../feature/InformationRecording';

const steps = [
  'ثبت شرکت ',
  'ثبت هیئت مدیره ',
  'قرارداد عاملیت',
  'اطلاعات تکمیلی',
  'قرار داد اجرایی',
];

const CardsDetail = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const isStepFailed = (step) => {
    return step === 1;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                تکمیل کنید
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box sx={{ mt: 2 }}>{activeStep === 0 && <InformationRecording />}</Box>
    </Box>
  );
};

export default CardsDetail;
