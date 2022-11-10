import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const Nav = ({ button }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('chat')}</Link>
        {button && <Button type="button" onClick={logout}>{t('buttons.logout')}</Button>}
      </div>
    </nav>
  )
};

export default Nav;