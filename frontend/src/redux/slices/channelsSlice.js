import { createSlice } from "@reduxjs/toolkit";
import fetchAuthorizationData from '../thunk.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: 0 },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorizationData.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    })
  }
});

export default channelsSlice.reducer;