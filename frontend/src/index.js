import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { Provider as RollbarProvider } from '@rollbar/react';
import Rollbar from 'rollbar';

import App from './App';
import store from './redux/index.js';
import './styles/style.css';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18Instance from './i18n/index.js';

//rollbar
const rollbarConfig = {
  enabled: 'production',
  accessToken: '57a8f4fd01e84f60a63b6e284f802ed1',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const rollbar = new Rollbar(rollbarConfig);

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <Provider store={store}>
    <RollbarProvider instance={rollbar}>
      <I18nextProvider i18n={i18Instance}>
        <App />
      </I18nextProvider>
    </RollbarProvider>
  </Provider>
);