import { createSlice } from '@reduxjs/toolkit';

const notifSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: (state, action) => {
      return '';
    },
  },
});

export const { setNotification, clearNotification } = notifSlice.actions;

export default notifSlice.reducer;

export const displayNotification = (message, duration) => {
  const durationInMs = duration * 1000;
  return async (dispatch) => {
    dispatch(setNotification(message));

    setTimeout(() => {
      dispatch(clearNotification());
    }, durationInMs);
  };
};