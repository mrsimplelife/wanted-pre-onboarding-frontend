import { FormEventHandler, PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../service/auth';
import { getFormValue } from '../utils';

type AuthContextType = {
  token: string | null;
  handleSignin: FormEventHandler<HTMLFormElement>;
  handleSignout: () => void;
  handleSignup: FormEventHandler<HTMLFormElement>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const handleSignin: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const email = getFormValue(e, 'email');
      const password = getFormValue(e, 'password');
      try {
        const res = await signin({ email, password });
        localStorage.setItem('token', res.access_token);
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
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  return <AuthContext.Provider value={{ token, handleSignin, handleSignup, handleSignout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext)!;
}
