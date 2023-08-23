import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../service/auth';
import { createToken, deleteToken, readToken } from '../service/token';

function useAuth() {
  const [token, setToken] = useState(readToken());

  const navigate = useNavigate();

  const handleSignin = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await signin({ email, password });
        createToken(res.access_token);
        setToken(res.access_token);
        navigate('/', { replace: true });
      } catch (error) {}
    },
    [navigate]
  );

  const handleSignup = useCallback(
    async (email: string, password: string) => {
      try {
        await signup({ email, password });
        navigate('/signin');
      } catch (e) {}
    },
    [navigate]
  );

  const handleSignout = useCallback(() => {
    deleteToken();
    setToken(null);
  }, []);

  return { token, handleSignin, handleSignup, handleSignout };
}

export default useAuth;

export type UseAuth = ReturnType<typeof useAuth>;
