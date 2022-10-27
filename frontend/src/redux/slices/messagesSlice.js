import { createSlice, } from "@reduxjs/toolkit";
import fetchAuthorizationData from '../thunk.js';

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
      console.log(payload);
      return payload.messages.filter(({ channelId }) => channelId === payload.currentChannelId);
    })
  }
});

export const { addMessage }  = messagesSlice.actions;
export default messagesSlice.reducer;