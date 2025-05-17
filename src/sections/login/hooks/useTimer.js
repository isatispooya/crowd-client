import { useState, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';

const useTimer = () => {
  const [timer, setTimer] = useState(90);
  const [step, setStep] = useState(1);
  const intervalRef = useRef(null);
  const currentTimer = useRef(90); 

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = useCallback(() => {
    clear();
    currentTimer.current = 90;
    setTimer(90);
  }, []);

  const startTimer = useCallback(() => {
    clear();
    currentTimer.current = 90;
    setTimer(90);

    intervalRef.current = setInterval(() => {
      currentTimer.current -= 1;
      setTimer(currentTimer.current);

      if (currentTimer.current <= 0) {
        clear();
        setStep(1);
        currentTimer.current = 90;
        setTimer(90);
        toast.info('زمان وارد کردن کد تایید به پایان رسید. لطفاً دوباره تلاش کنید.');
      }
    }, 1000);
  }, []);

  return { timer, step, setStep, startTimer, resetTimer };
};

export default useTimer;
