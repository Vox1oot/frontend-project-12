import { io } from 'socket.io-client';

import { useState, useMemo } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import Chat from './pages/Chat';
import Login from './pages/Login';
import NotFoundPage from './pages/notFoundPage';
import Signup from './pages/Signup';

import Context from './context/index.jsx';
import useAuthContext from './hooks/index.jsx';

const MainProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
  });

  const memo = useMemo(() => ({ data: userData, setUserData }), [userData]);

  return (
    <Context.Provider value={memo}>
      {children}
    </Context.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();

  const { token } = authContext.data;
  return token ? children : <Navigate to="/login" />;
};

const socket = io();

const App = () => (
  <MainProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <Chat socket={socket} />
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
