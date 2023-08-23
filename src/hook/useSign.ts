import { ChangeEventHandler, useCallback, useState } from 'react';

function useSign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChanged: ChangeEventHandler<HTMLInputElement> = useCallback((e) => setEmail(e.target.value), []);
  const handlePasswordChanged: ChangeEventHandler<HTMLInputElement> = useCallback((e) => setPassword(e.target.value), []);

  const disabled = !email.includes('@') || password.length < 8;

  return { handleEmailChanged, handlePasswordChanged, disabled };
}

export default useSign;
