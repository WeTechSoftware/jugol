import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store/index';
import { API_URL } from '../../config';
import { login } from '@store/features/auth/authSlice';
import auth from '@react-native-firebase/auth';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers: Headers, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth.idToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403 || result?.error?.status === 401) {
    const idToken = await auth().currentUser?.getIdToken(true);

    if (idToken) {
      api.dispatch(login(idToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      auth().signOut();
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    'getUserDetails',
    'getUserProfilePicture',
    'getConvarsations',
    'getMessages',
    'getAllLikes',
    'getAllUser',
    'getAllBlocks'
  ],
  endpoints: builder => ({}),
});
