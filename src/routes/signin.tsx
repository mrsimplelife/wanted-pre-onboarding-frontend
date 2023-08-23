import { useAuth } from '../context/AuthContext';
import useSign from '../hook/useSign';

function Signin() {
  const { handleEmailChanged, handlePasswordChanged, disabled } = useSign();
  const { handleSignin } = useAuth();
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSignin}>
        <input data-testid='email-input' placeholder='이메일' name='email' type='text' onChange={handleEmailChanged} />
        <input data-testid='password-input' placeholder='비밀번호' name='password' type='password' onChange={handlePasswordChanged} />
        <button data-testid='signin-button' disabled={disabled}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default Signin;
