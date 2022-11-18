import { io } from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import { SocketContext } from './context/index.js';
import { addChannel, deleteChannel, renameChannel } from './redux/slices/channelsSlice.js';
import { addMessage } from './redux/slices/messagesSlice.js';
import store from './redux/index.js';
import i18Instance from './i18n/index.js';

import App from './App.js';

const runApp = () => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    console.log(payload);
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(deleteChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  const addNewMessage = (props, resolve) => {
    socket.emit('newMessage', props, ({ status }) => {
      if (status) {
        resolve();
      }
    });
  };

  const addNewChannel = (props, resolve) => {
    socket.emit('newChannel', props, ({ status }) => {
      if (status) {
        resolve();
      }
    });
  };

  const removeChannel = (props, resolve) => {
    socket.emit('removeChannel', props, ({ status }) => {
      if (status) {
        resolve();
      }
    });
  };

  const renameChannelName = (props, resolve) => {
    socket.emit('renameChannel', props, ({ status }) => {
      if (status) {
        resolve();
      }
    });
  };

  const rollbarConfig = {
    enabled: true,
    // eslint-disable-next-line no-undef
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18Instance}>
            <SocketContext.Provider
              value={{
                addNewMessage,
                addNewChannel,
                removeChannel,
                renameChannelName,
              }}
            >
              <App />
            </SocketContext.Provider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>,
  );
};

export default runApp;
