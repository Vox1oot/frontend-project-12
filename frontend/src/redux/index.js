// инициализируем хранилище
import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import modalReducer from './slices/modalSlice.js';
import loaderSlice from './slices/loaderSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
    loader: loaderSlice,
  },
});
