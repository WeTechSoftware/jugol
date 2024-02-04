import {apiSlice} from '../apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    checkUser: builder.mutation({
      query: (uid) => ({
        url: `user/checkUser`,
        method: 'POST',
        body: {uid}
      }),
    }),
    createFCMToken: builder.mutation({
      query: body => ({
        url: 'user/createFcmToken',
        method: 'POST',
        body: body,
      }),
    }),
    deleteFCMToken: builder.mutation({
      query: fcmToken => ({
        url: `user/deleteFcmToken/${fcmToken}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCheckUserMutation,
  useCreateFCMTokenMutation,
  useDeleteFCMTokenMutation,
} = authApiSlice;
