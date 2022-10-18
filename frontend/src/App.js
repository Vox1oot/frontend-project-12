import { BrowserRouter, Route, Routes, } from 'react-router-dom';

import Login from './pages/Login';
import NotFoundPage from './pages/notFoundPage';

import Nav from './components/Nav';

const App = () => {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
