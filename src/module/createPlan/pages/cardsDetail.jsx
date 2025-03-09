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
import InformationRecording from '../feature/registerCompany/companyRegister.feat.jsx';
import { BoardOfDirectorsRegistration } from '../feature';

const steps = ['ثبت شرکت', 'ثبت هیئت مدیره', 'قرارداد عاملیت', 'اطلاعات تکمیلی', 'قرارداد اجرایی'];

const CardsDetail = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <Box
      sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {!isMobile && (
        <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', mb: 3 }}>
          {steps.map((label, index) => (
            <Step key={label} onClick={() => handleStepClick(index)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
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
        {activeStep === 0 && <InformationRecording />}
        {activeStep === 1 && <BoardOfDirectorsRegistration />}
        {activeStep > 1 && (
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
            محتوای مرحله {steps[activeStep]}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CardsDetail;
