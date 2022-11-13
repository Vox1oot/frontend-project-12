import i18next from 'i18next';
import resources from './resources/index.js';

const i18Instance = i18next.createInstance();
i18Instance.init({
  lng: 'ru',
  debug: false,
  resources,
});

export default i18Instance;
