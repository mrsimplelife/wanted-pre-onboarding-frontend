import { FormEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../service/auth';
import { getFormValue } from '../utils';
import { createToken, deleteToken, readToken } from '../service/token';

function useAuth() {
  const [token, setToken] = useState(readToken());

  const navigate = useNavigate();

  const handleSignin: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const email = getFormValue(e, 'email');
      const password = getFormValue(e, 'password');
      try {
        const res = await signin({ email, password });
        createToken(res.access_token);
        setToken(res.access_token);
        navigate('/', { replace: true });
      } catch (error) {}
    },
    [navigate]
  );

  const handleSignup: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const email = getFormValue(e, 'email');
      const password = getFormValue(e, 'password');
      try {
        await signup({ email, password });
        navigate('/signin', { replace: true });
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
