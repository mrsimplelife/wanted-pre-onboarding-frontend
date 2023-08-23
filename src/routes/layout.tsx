import { NavLink, Outlet } from 'react-router-dom';
import { useAuthContext, useAuthMethodContext } from '../context/AuthContext';

function Layout() {
  const { token } = useAuthContext();
  const { handleSignout } = useAuthMethodContext();
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
            <li>
              <button onClick={handleSignout}>로그아웃</button>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
