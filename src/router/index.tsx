import { useEffect } from 'react';
import { NavLink, Navigate, Outlet, Route, createBrowserRouter, createRoutesFromElements, useNavigate, useNavigation } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import ErrorPage from '../error-page';
import Signin from '../routes/signin';
import Signup from '../routes/signup';
import Todo from '../routes/todo';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
      <Route element={<Layout />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Index />} />
          <Route element={<NotToken />}>
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
          </Route>
          <Route element={<Token />}>
            <Route path='todo' element={<Todo />} />
            <Route path='signout' />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default router;

function Root() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

function Layout() {
  const { token, handleSignout } = useAuth();
  return (
    <>
      <nav>
        <ul>
          {!token && (
            <>
              <li>
                <NavLink to={`signup`} className={({ isActive }) => (isActive ? 'active' : '')}>
                  회원가입
                </NavLink>
              </li>
              <li>
                <NavLink to={`signin`} className={({ isActive }) => (isActive ? 'active' : '')}>
                  로그인
                </NavLink>
              </li>
            </>
          )}
          {!!token && (
            <>
              <li>
                <button onClick={handleSignout}>로그아웃</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

function Index() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/todo', { replace: true });
    } else {
      navigate('/signin', { replace: true });
    }
  }, [navigate, token]);
  return null;
}

function NotToken() {
  const { token } = useAuth();
  const navigation = useNavigation();
  if (token) {
    return <Navigate to={'todo'} replace state={navigation.state} />;
  }
  return <Outlet />;
}

function Token() {
  const { token } = useAuth();
  const navigation = useNavigation();
  if (!token) {
    return <Navigate to={'signin'} replace state={navigation.state} />;
  }
  return <Outlet />;
}
