import { FormEventHandler, PropsWithChildren, createContext, useContext } from 'react';
import useAuth from '../hook/useAuth';

type AuthContextType = {
  token: string | null;
  handleSignin: FormEventHandler<HTMLFormElement>;
  handleSignout: () => void;
  handleSignup: FormEventHandler<HTMLFormElement>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const { handleSignin, handleSignout, handleSignup, token } = useAuth();

  return <AuthContext.Provider value={{ token, handleSignin, handleSignup, handleSignout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext)!;
}
