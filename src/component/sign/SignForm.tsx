import { memo } from 'react';
import useSign from '../../hook/useSign';
import { getFormValue } from '../../utils';

type SignFormProps = {
  title: string;
  onSubmit: (email: string, password: string) => void;
};

function SignForm({ title, onSubmit }: SignFormProps) {
  const { handleEmailChanged, handlePasswordChanged, disabled } = useSign();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = getFormValue(e, 'email');
    const password = getFormValue(e, 'password');
    onSubmit(email, password);
  };
  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <input data-testid='email-input' placeholder='이메일' name='email' type='text' onChange={handleEmailChanged} />
        <input data-testid='password-input' placeholder='비밀번호' name='password' type='password' onChange={handlePasswordChanged} autoComplete='true' />
        <button data-testid='signup-button' disabled={disabled}>
          {title}
        </button>
      </form>
    </div>
  );
}

export default memo(SignForm);
