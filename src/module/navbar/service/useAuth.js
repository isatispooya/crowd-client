import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from 'src/api/apiClient';
import { getCookie, setCookie } from 'src/api/cookie';

const getProfileUser = async () => {
  const access = getCookie('access');
  const response = await api.get(`/api/information/`, {
    headers: { Authorization: `Bearer ${access}` },
  });
  return response.data;
};

const useAuth = () => {
  const navigate = useNavigate();

  const {
    data: userData,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfileUser(),
  });

  const logout = () => {
    setCookie('access', '', { expires: new Date(0) });
    navigate('/login');
  };
  return {
    userData,
    isLoadingUser,
    errorUser,
    logout,
  };
};

export default useAuth;


