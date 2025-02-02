import useOneTimeLogin from 'src/routes/hooks/useOneTime';
import { useNavigate, useParams } from 'react-router-dom';
import { setCookie } from 'src/api/cookie';
import Loader from 'src/components/loader'; 

export default function OnetimeLogin() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useOneTimeLogin(uuid);

  const handleToken = () => {
    setCookie('access', data?.data?.token, 1);
    navigate('/');
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>خطا در ورود: {error.message}</div>;
  }

  if (data) {
    handleToken();
  }

  return <Loader />;
}
