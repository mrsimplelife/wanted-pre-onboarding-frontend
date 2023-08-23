import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';

function Index() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/todo', { replace: true });
    } else {
      navigate('/signin', { replace: true });
    }
  }, [navigate, token]);
  return null;
}

export default Index;
