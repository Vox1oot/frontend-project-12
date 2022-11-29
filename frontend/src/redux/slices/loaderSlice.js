/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchAuthorizationData from '../thunk.js';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: { status: 'AWAIT' },
  reducers: {
    toDefault(state) {
      state.status = 'AWAIT';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorizationData.fulfilled, (state) => {
      state.status = 'LOADED';
    });
    builder.addCase(fetchAuthorizationData.rejected, (state) => {
      state.status = 'ERROR';
    });
  },
});

export const loaderSelector = (state) => state.loader.status;
export const { toDefault } = loaderSlice.actions;
export default loaderSlice.reducer;
