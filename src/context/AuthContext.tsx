import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';
import useAuth, { UseAuth } from '../hook/useAuth';

export type AuthContextType = Pick<UseAuth, 'token'>;
export type AuthMethodContextType = Pick<UseAuth, 'handleSignin' | 'handleSignout' | 'handleSignup'>;

const AuthContext = createContext<AuthContextType | null>(null);
const AuthMethodContext = createContext<AuthMethodContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const { handleSignin, handleSignout, handleSignup, token } = useAuth();
  const value = useMemo(() => ({ token }), [token]);
  const [method] = useState({ handleSignin, handleSignout, handleSignup });

  return (
    <AuthContext.Provider value={value}>
      <AuthMethodContext.Provider value={method}>{children}</AuthMethodContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext)!;
}

export function useAuthMethodContext() {
  return useContext(AuthMethodContext)!;
}
