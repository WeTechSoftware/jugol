import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from './authSlice.types';
import { RootState } from '@store/index';

const initialState: IAuthState = {
  checkUserInformation: true,
  idToken: null,
  fcmToken: null,
  checkNotificationPermission: false,
  uid: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCheckUserInformation: (state, action) => {
      state.checkUserInformation = action.payload;
    },
    setFCMToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    login: (state, action) => {
      state.idToken = action.payload;
    },
    setUID: (state, action) => {
      state.uid = action.payload;
    },
    setCheckNotificationPermission: (state, action) => {
      state.checkNotificationPermission = action.payload;
    },
    logout: state => {
      state.idToken = null;
      state.checkUserInformation = true;
      state.fcmToken = null;
      state.uid = null;
    },
  },
});

export const {
  setCheckUserInformation,
  login,
  setUID,
  logout,
  setFCMToken,
  setCheckNotificationPermission,
} = authSlice.actions;
export const selectCheckUserInformation = (state: RootState) =>
  state.auth.checkUserInformation;
export const selectIdToken = (state: RootState) => state.auth.idToken;
export const selectFCMToken = (state: RootState) => state.auth.fcmToken;
export const selectUID = (state: RootState) => state.auth.uid;
export const selectCheckNotificationPermission = (state: RootState) =>
  state.auth.checkNotificationPermission;

const authReducer = authSlice.reducer;

export default authReducer;
