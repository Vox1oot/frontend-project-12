import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Chat from './pages/Chat';
import Login from './pages/Login';
import NotFoundPage from './pages/notFoundPage';

import Nav from './components/Nav';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(token);
  {/* if (!token) {
    return <Login setToken={setToken} />
  } */}

  return (
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
