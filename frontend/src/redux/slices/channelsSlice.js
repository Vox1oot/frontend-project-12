import { createSlice } from "@reduxjs/toolkit";
import fetchAuthorizationData from '../thunk.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: 0 },
  reducers: {
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorizationData.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    })
  }
});

export const { changeChannel, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;