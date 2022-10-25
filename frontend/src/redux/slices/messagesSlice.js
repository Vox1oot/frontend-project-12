import { createSlice } from "@reduxjs/toolkit";
import fetchAuthorizationData from '../thunk.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorizationData.fulfilled, (state, { payload }) => {
      //console.log(payload);
      return payload.messages;
    })
  }
});

export default messagesSlice.reducer;