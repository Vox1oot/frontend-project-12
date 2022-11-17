import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import Chat from './pages/Chat';
import Login from './pages/Login';
import NotFoundPage from './pages/notFoundPage';
import Signup from './pages/Signup';

import useAuthContext from './hooks/index.js';
import MainProvider from './context/MainProvider';

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();

  const { token } = authContext.data;
  return token ? children : <Navigate to="/login" />;
};

const App = () => (
  <MainProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
            )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </MainProvider>
);

export default App;
