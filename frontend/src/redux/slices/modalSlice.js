/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isShowing: false, type: null, payload: null },
  reducers: {
    openModal: (state, { payload }) => {
      state.isShowing = true;
      state.type = payload;
    },
    closeModal: (state) => {
      state.isShowing = false;
      state.type = null;
      state.payload = null;
    },
    setPayload: (state, { payload }) => {
      state.payload = payload;
    },
  },
});

export const modalSelector = (state) => state.modal;
export const { openModal, closeModal, setPayload } = modalSlice.actions;
export default modalSlice.reducer;
