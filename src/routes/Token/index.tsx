import { Navigate, Outlet, useNavigation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

function Token() {
  const { token } = useAuthContext();
  const navigation = useNavigation();
  if (!token) {
    return <Navigate to={'signin'} replace state={navigation.state} />;
  }
  return <Outlet />;
}

export default Token;
