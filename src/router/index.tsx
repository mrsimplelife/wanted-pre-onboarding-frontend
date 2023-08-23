import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ErrorPage from '../error-page';
import Index from '../routes';
import NotToken from '../routes/NotToken';
import Signin from '../routes/NotToken/signin';
import Signup from '../routes/NotToken/signup';
import Todo from '../routes/Token/todo';
import Layout from '../routes/layout';
import Token from '../routes/Token';

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
