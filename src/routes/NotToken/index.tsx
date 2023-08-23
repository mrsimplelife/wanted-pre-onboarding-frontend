import { Navigate, Outlet, useNavigation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

function NotToken() {
  const { token } = useAuthContext();
  const navigation = useNavigation();
  if (token) {
    return <Navigate to={'todo'} replace state={navigation.state} />;
  }
  return <Outlet />;
}

export default NotToken;
