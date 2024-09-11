import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import { CheckCircle, RadioButtonUnchecked, Lens } from '@mui/icons-material';
import ResumePage from 'src/sections/resume/Page/ResumePage';
import ContractPage from 'src/module/contract/page';
import UseCartId from 'src/hooks/use-cartId';
import CardList from './ListCard';
import Form from './form';
import ManegersDetails from './manegersDetails';
import Clearify from './clearify';
import Shareholders from './shareholders';
import CompletionMessage from './finishLine';
import Validation from './Validation';
import Other from './other';

const steps = [
  'انتخاب یا ایجاد',
  'اطلاعات شرکت',
  'اطلاعات مدیران',
  'مستندات مدیران',
  'سهامداران',
  'سایر موارد',
  'اعتبارسنجی',
  ' سوء پیشینه',
  'قرارداد عاملیت'
];

const Sterpercrowd = () => {
  const {setCartId} = UseCartId()
  const [activeStep, setActiveStep] = useState(0);
  const [cardSelected, setCardSelected] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const navigate = useNavigate();
  const access = getCookie('access');

  
  useEffect(() => {
    if (!access) {
      navigate('/login');
    } else {
      setIsCheckingAuth(false);
    }
  }, [access, navigate]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setIsCompleted(true);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepsEnabled || stepIndex === 0) {
      setActiveStep(stepIndex);
      setIsCompleted(false);
    }
  };

  const getStepIcon = (index) => {
    if (activeStep > index) {
      return (
        <CheckCircle className="text-green-500 transition-transform duration-300 transform scale-125" />
      );
    }
    if (activeStep === index) {
      return (
        <Lens className="text-blue-600 transition-transform duration-300 transform scale-110" />
      );
    }
    return (
      <RadioButtonUnchecked className="text-gray-400 transition-transform duration-300 transform scale-100" />
    );
  };

  const renderStepContent = (step) => {
    if (isCompleted) {
      return <CompletionMessage />;
    }

    switch (step) {
      case 0:
        return (
          <CardList
          setCartId={setCartId}
            setCardSelected={setCardSelected}
            handleNext={handleNext}
            enableSteps={() => setStepsEnabled(true)}
          />
        );
      case 1:
        return (
          <Form
            enableSteps={() => setStepsEnabled(true)}
            cardSelected={cardSelected}
            handleNext={handleNext}
          />
        );
      case 2:
        return <ManegersDetails cardSelected={cardSelected} handleNext={handleNext} id={cardSelected} />;
      case 3:
        return <ResumePage id={cardSelected}  handleNext={handleNext}/>;
      case 4:
        return <Shareholders cardSelected={cardSelected}  handleNext={handleNext}/>;
      case 5:
        return <Other cardSelected={cardSelected}  handleNext={handleNext}/>;
      case 6:
        return <Validation cardSelected={cardSelected} handleNext={handleNext} />;
      case 7:
        return <Clearify cardSelected={cardSelected} handleNext={handleNext} />;
      case 8 : 
        return  <ContractPage cardSelected={cardSelected} handleNext={handleNext}/> ;
      default:
        return <CompletionMessage />;
    }
  };

  if (isCheckingAuth) {
    return null;
  }

  return (
    <div className="bg-gray-50 mx-auto p-6 rounded-lg shadow-2xl">
      <Stepper activeStep={activeStep} alternativeLabel connector={null} className="w-full">
        {steps.map((label, index) => (
          <Step
            key={index}
            className="flex flex-col items-center"
            disabled={!stepsEnabled && index !== 0}
          >
            <StepLabel
              icon={getStepIcon(index)}
              onClick={() => handleStepClick(index)}
              style={{ cursor: stepsEnabled || index === 0 ? 'pointer' : 'not-allowed' }}
            >
              <span className="block text-lg md:text-base font-semibold text-gray-700 transition-all duration-300 hover:text-blue-600 hover:scale-105">
                {label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-12">{renderStepContent(activeStep)}</div>
      <ToastContainer />
    </div>
  );
};

export default Sterpercrowd;
