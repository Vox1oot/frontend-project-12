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
      return payload.messages;
    })
  }
});

export const { addMessage }  = messagesSlice.actions;
export default messagesSlice.reducer;