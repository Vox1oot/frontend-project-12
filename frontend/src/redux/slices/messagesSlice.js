import { createSlice } from '@reduxjs/toolkit';
import fetchAuthorizationData from '../thunk.js';

import { deleteChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorizationData.fulfilled, (state, { payload }) => payload.messages);
    builder
      .addCase(deleteChannel, (state, { payload }) => {
        const filtered = state.filter(({ channelId }) => channelId !== payload.id);
        return filtered;
      });
  },
});

export const messagesSelector = (state) => state.messages;
export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
