import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import { readLocalStorage, removeLocalStorage } from './utils/localStorage';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import { getUserByToken, login } from './utils/net';
import { UserProvider, useUser } from './contexts/UserContext';

// 路由守卫组件
const PrivateRoute = ({ children }: { children: React.ReactNode }) =>
{
  const navigate = useNavigate();
  const { setUser } = useUser();
  const token = readLocalStorage('token', String); // 或者从其他存储位置获取token
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  React.useEffect(() =>
  {
    getUserByToken(token).then(user =>
    {
      if (user) {
        setUser(user);
        navigate('/');
      } else {
        removeLocalStorage('token');
        navigate('/login');
      }
    });
  }, []);

  return <>{children}</>;
};

// 公共路由组件（已登录时重定向到首页）
const PublicRoute = ({ children }: { children: React.ReactNode }) =>
{
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {/* 登录页面路由 */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />

            {/* 受保护的主应用路由 */}
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <App />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
