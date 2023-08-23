import { ChangeEventHandler, useCallback, useState } from 'react';

function useSign() {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const disabled = !email.includes('@') || password.length < 8;

  const handleEmailChanged: ChangeEventHandler<HTMLInputElement> = useCallback((e) => setEmail(e.target.value), []);

  const handlePasswordChanged: ChangeEventHandler<HTMLInputElement> = useCallback((e) => setPassword(e.target.value), []);

  return { disabled, handleEmailChanged, handlePasswordChanged };
}

export default useSign;

export type UseSign = ReturnType<typeof useSign>;
