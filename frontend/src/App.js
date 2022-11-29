import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Checker from './pages/chat/components/Checker';
import Login from './pages/login/Login';
import NotFoundPage from './pages/notFoundPage';
import Signup from './pages/signup/Signup';

import { useAuthContext } from './context/index.js';
import MainProvider from './context/MainProvider';

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();
  return authContext.data ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }) => {
  const authContext = useAuthContext();
  return authContext.data ? <Navigate to="/" /> : children;
};

const App = () => (
  <MainProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(<PrivateRoute><Checker /></PrivateRoute>)} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </MainProvider>
);

export default App;
