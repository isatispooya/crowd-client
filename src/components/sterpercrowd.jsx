import React, { useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


  const access = getCookie('access');

  


  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setIsCompleted(true);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleStepClick = (stepIndex) => {

      setActiveStep(stepIndex);
      setIsCompleted(false);

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
         

          />
        );
      case 1:
        return (
          <Form

            cardSelected={cardSelected}
          
          />
        );
      case 2:
        return <ManegersDetails cardSelected={cardSelected}  id={cardSelected} />;
      case 3:
        return <ResumePage id={cardSelected} />;
      case 4:
        return <Shareholders cardSelected={cardSelected}  />;
      case 5:
        return <Other cardSelected={cardSelected}  />;
      case 6:
        return <Validation cardSelected={cardSelected}  />;
      case 7:
        return <Clearify cardSelected={cardSelected}  />;
      case 8 : 
        return  <ContractPage cardSelected={cardSelected} /> ;
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

          >
            <StepLabel
              icon={getStepIcon(index)}
              onClick={() => handleStepClick(index)}

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
