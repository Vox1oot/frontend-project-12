import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Chat from './pages/Chat';
import Login from './pages/Login';
import NotFoundPage from './pages/notFoundPage';
//import Nav from './components/Nav';

import Context from './context/index.jsx';
import useAuthContext from './hooks/index.jsx';

const MainProvider = ({ children }) => {
  const [userData, setUserData] = useState({ 
    token: localStorage.getItem('token'), 
    username: localStorage.getItem('username'),
  });

  return (
    <Context.Provider value={{ data: userData, setUserData }}>
      {children}
    </Context.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();

  const { token } = authContext.data;
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
};

export default App;
