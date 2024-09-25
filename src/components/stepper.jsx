import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import { CheckCircle, RadioButtonUnchecked, Lens } from '@mui/icons-material';
import ResumePage from 'src/sections/resume/Page/ResumePage';
import ContractPage from 'src/module/contract/page';
import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import CardList from '../module/cards/components/ListCard';
import Form from '../module/companies/components/companyView';
import ManegersDetails from '../module/manegers/components/manegersDetails';
import Clearify from '../module/histories/components/clearify';
import Shareholders from '../module/shareholders/components/shareholders';
import CompletionMessage from './finishLine';
import Validation from '../module/validations/Validation';
import Other from '../module/otherUploads/components/other';

const steps = [
  'انتخاب یا ایجاد',
  'اطلاعات شرکت',
  'اطلاعات مدیران',
  'مستندات مدیران',
  'سهامداران',
  'سایر موارد',
  'اعتبارسنجی',
  'سوء پیشینه',
  'اطلاعات قرارداد',
];

const Sterpercrowd = () => {
  const { setCartId } = UseCartId();
  const [isCompleted, setIsCompleted] = useState(false);

  const [cardSelected, setCardSelected] = useState(null); 
  const [isStepLocked, setIsStepLocked] = useState(true); 
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const access = getCookie('access');
  const { page: activeStep, incrementPage, changePage } = useNavigateStep();

  useEffect(() => {
    if (!access) {
      navigate('/login');
    } else {
      setIsCheckingAuth(false);
    }
  }, [access, navigate]);

  const handleStepClick = (stepIndex) => {

    if (isStepLocked && stepIndex > 0) {
      toast.error('ابتدا یک لیست را انتخاب کنید یا ایجاد کنید');
      return;
    }
    changePage(stepIndex);
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
            setCardSelected={(card) => {
              setCardSelected(card);
              setIsStepLocked(false); 
           
            }}
            incrementPage={incrementPage}
     
          />
        );
      case 1:
        return <Form setCartId={setCartId} incrementPage={incrementPage} />;
      case 2:
        return <ManegersDetails setCartId={setCartId} incrementPage={incrementPage} />;
      case 3:
        return <ResumePage cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 4:
        return <Shareholders cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 5:
        return <Other cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 6:
        return <Validation cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 7:
        return <Clearify cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 8:
        return <ContractPage cardSelected={cardSelected} incrementPage={incrementPage} />;
      default:
        return <CompletionMessage />;
    }
  };

  if (isCheckingAuth) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 block z-50 mx-auto p-6 rounded-lg shadow-2xl">
      <ToastContainer />
      <Stepper activeStep={activeStep} alternativeLabel connector={null} className="w-full flex-grow">
        {steps.map((label, index) => (
          <Step key={index} className="flex flex-col items-center">
            <StepLabel
              icon={getStepIcon(index)}
              onClick={() => handleStepClick(index)}
              style={{ cursor: isStepLocked && index > 0 ? 'not-allowed' : 'pointer' }} // Disable clicking locked steps
            >
              <span
                className={`block text-lg md:text-base font-semibold ${
                  isStepLocked && index > 0 ? 'text-gray-400' : 'text-gray-700'
                } transition-all duration-300 hover:text-blue-600 hover:scale-105`}
              >
                {label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-12">{renderStepContent(activeStep)}</div>
    </div>
  );
};

export default Sterpercrowd;
