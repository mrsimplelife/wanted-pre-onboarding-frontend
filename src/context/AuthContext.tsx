import { PropsWithChildren, createContext, useContext } from 'react';
import useAuth, { UseAuth } from '../hook/useAuth';

const AuthContext = createContext<UseAuth | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const { handleSignin, handleSignout, handleSignup, token } = useAuth();

  return <AuthContext.Provider value={{ token, handleSignin, handleSignup, handleSignout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext)!;
}

export type AuthContextType = Partial<ReturnType<typeof useAuthContext>>;
