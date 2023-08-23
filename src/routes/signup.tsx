import { useAuth } from '../context/AuthContext';
import useSign from '../hook/useSign';

function Signup() {
  const { handleEmailChanged, handlePasswordChanged, disabled } = useSign();
  const { handleSignup } = useAuth();
  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSignup}>
        <input data-testid='email-input' placeholder='이메일' name='email' type='text' onChange={handleEmailChanged} />
        <input data-testid='password-input' placeholder='비밀번호' name='password' type='password' onChange={handlePasswordChanged} />
        <button data-testid='signup-button' disabled={disabled}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
