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
import useNavigateStep from 'src/hooks/use-navigate-step';
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
  'سوء پیشینه',
  'قرارداد عاملیت',
];

const Sterpercrowd = () => {
  const { setCartId } = UseCartId();
  const [isCompleted, setIsCompleted] = useState(false);
  const [cardSelected, setCardSelected] = useState(null); // وضعیت انتخاب کارت
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // وضعیت بررسی احراز هویت
  const navigate = useNavigate();
  const access = getCookie('access');
  const { page: activeStep, incrementPage, changePage } = useNavigateStep(); // هوک برای مدیریت مراحل

  // اثر برای بررسی احراز هویت
  useEffect(() => {
    if (!access) {
      navigate('/login');
    } else {
      setIsCheckingAuth(false); // دسترسی درست است، ادامه بده
    }
  }, [access, navigate]);

  // مدیریت کلیک بر روی هر مرحله
  const handleStepClick = (stepIndex) => {
    changePage(stepIndex); // به مرحله انتخاب شده برو
    setIsCompleted(false); // اتمام مراحل لغو شود
  };

  // آیکون مرحله
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

  // محتوای هر مرحله را برمی‌گرداند
  const renderStepContent = (step) => {
    if (isCompleted) {
      return <CompletionMessage />; // اگر مراحل کامل شده باشد، پیام اتمام نمایش داده شود
    }

    switch (step) {
      case 0:
        return (
          <CardList
            setCartId={setCartId}
            setCardSelected={setCardSelected}
            incrementPage={incrementPage}
          />
        );
      case 1:
        return (
          <Form
            setCartId={setCartId} incrementPage={incrementPage}
          />
        );
      case 2:
        return <ManegersDetails setCartId={setCartId} incrementPage={incrementPage} />;
      case 3:
        return <ResumePage cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 4:
        return <Shareholders cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 5:
        return <Other cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 6:
        return <Validation cardSelected = { cardSelected } incrementPage = { incrementPage } />;
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
    <div className="bg-gray-50 mx-auto p-6 rounded-lg shadow-2xl">
      
      <Stepper activeStep={activeStep} alternativeLabel connector={null} className="w-full">
        {steps.map((label, index) => (
          <Step key={index} className="flex flex-col items-center">
            <StepLabel icon={getStepIcon(index)} onClick={() => handleStepClick(index)}>
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
