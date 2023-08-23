import SignForm from '../../component/sign/SignForm';
import { useAuthMethodContext } from '../../context/AuthContext';

function Signin() {
  const { handleSignin } = useAuthMethodContext();
  return <SignForm title='로그인' onSubmit={handleSignin} />;
}

export default Signin;
