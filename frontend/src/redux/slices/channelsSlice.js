/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchAuthorizationData from '../thunk.js';

const findIndex = (channels, id) => channels.findIndex((channel) => channel.id === id);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: 1 },
  reducers: {
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
    deleteChannel: (state, { payload }) => {
      const index = findIndex(state.channels, payload.id);
      state.channels.splice(index, 1);
      state.currentChannelId = 1;
    },
    renameChannel: (state, { payload }) => {
      const index = findIndex(state.channels, payload.id);
      state.channels[index].name = payload.name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorizationData.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

export const {
  changeChannel, addChannel, deleteChannel, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
