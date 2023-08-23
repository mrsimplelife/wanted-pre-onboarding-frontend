import SignForm from '../../component/sign/SignForm';
import { useAuthMethodContext } from '../../context/AuthContext';

function Signup() {
  const { handleSignup } = useAuthMethodContext();
  return <SignForm title='회원가입' onSubmit={handleSignup} />;
}

export default Signup;
