import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie } from 'src/api/cookie'; 

export function useCheckAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie('access');

    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);
}
