import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  }

  return (
    <Dropdown className="d-flex flex-row-reverse m-3">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {language.toUpperCase()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => toggleLanguage('ru')}>Русский</Dropdown.Item>
        <Dropdown.Item onClick={() => toggleLanguage('en')}>English</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSwitcher;