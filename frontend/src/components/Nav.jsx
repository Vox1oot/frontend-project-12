import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

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
        <a className="navbar-brand" href='/'>{t('chat')}</a>
        {button && <Button type="button" onClick={logout}>{t('buttons.logout')}</Button>}
      </div>
    </nav>
  )
};

export default Nav;