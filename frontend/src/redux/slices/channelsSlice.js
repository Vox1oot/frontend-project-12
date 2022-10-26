import { createSlice } from "@reduxjs/toolkit";
import fetchAuthorizationData from '../thunk.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: 0 },
  reducers: {
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorizationData.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    })
  }
});

export const { changeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;