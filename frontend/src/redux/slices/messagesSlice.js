import { createSlice } from "@reduxjs/toolkit";
import fetchAuthorizationData from '../thunk.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorizationData.fulfilled, (state, { payload }) => {
      state = [...state, ...payload.messages];
    })
  }
});

export default messagesSlice.reducer;