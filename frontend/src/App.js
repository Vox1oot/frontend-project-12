import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import NotFoundPage from './pages/notFoundPage';

import Nav from './components/Nav';

const App = () => {
  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Nav />
            <BrowserRouter>
              <Routes>
                {['/', '/login'].map((path, index) => (
                  <Route path={path} element={<Login />} key={index} />
                ))}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
