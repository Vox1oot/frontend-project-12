import { io } from 'socket.io-client';
import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import NotFoundPage from './pages/notFoundPage';
import Signup from './pages/Signup';
import useAuthContext from './hooks/index.jsx';
import MainProvider from './context/MainProvider';
import store from './redux/index.js';
import { addMessage } from './redux/slices/messagesSlice.js';
import { addChannel, deleteChannel, renameChannel } from './redux/slices/channelsSlice.js';

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();
  return authContext.data ? children : <Navigate to="/login" />;
};

const socket = io();

socket.on('newMessage', (payload) => {
  store.dispatch(addMessage(payload));
});

socket.on('newChannel', (payload) => {
  store.dispatch(addChannel(payload));
});

socket.on('removeChannel', (payload) => {
  store.dispatch(deleteChannel(payload));
});

socket.on('renameChannel', (payload) => {
  store.dispatch(renameChannel(payload));
});

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
