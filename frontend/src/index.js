import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/index.js';
import './styles/style.css';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18Instance from './i18n/index.js';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <Provider store={store} >
    <I18nextProvider i18n={i18Instance}>
      <App />
    </I18nextProvider>
  </Provider>
);