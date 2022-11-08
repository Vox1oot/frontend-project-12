import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import App from './App';
import store from './redux/index.js';
import './styles/style.css';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18Instance from './i18n/index.js';

//rollbar
const rollbarConfig = {
  // eslint-disable-next-line no-undef
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <Provider store={store}>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18Instance}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </Provider>
);