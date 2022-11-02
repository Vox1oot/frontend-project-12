import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Nav = ({ button }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href='/'>My chat</a>
        {button && <Button type="button" onClick={logout}>Выйти</Button>}
      </div>
    </nav>
  )
};

export default Nav;