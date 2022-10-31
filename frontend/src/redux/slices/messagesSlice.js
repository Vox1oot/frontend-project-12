import { createSlice } from "@reduxjs/toolkit";
import fetchAuthorizationData from '../thunk.js';

import { deleteChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, { payload }) => {
      state.push(payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorizationData.fulfilled, (state, { payload }) => {
      return payload.messages;
    }),
    builder.addCase(deleteChannel, (state, { payload }) => {
      return state.filter(({ channelId }) => channelId !== payload.id);
    })
  },
});

export const { addMessage }  = messagesSlice.actions;
export default messagesSlice.reducer;