import { IDashBoardFilterData } from './../../features/filterSlice/filterSlice.types';

import { apiSlice } from '../apiSlice';
import { IUserLocationData } from './userApiSlice.types';
import { setAllUserDetails, setLoading, setUserProfile } from '@store/features/user/userSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updateUserData: builder.mutation({
      query: body => ({
        url: 'user/updateUserDetails',
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['getUserDetails'],
    }),
    resetUserDetails: builder.mutation({
      query: () => ({
        url: 'user/resetUserDetails',
        method: 'PUT',
      }),
      invalidatesTags: ['getUserDetails'],
    }),
    addUserProfile: builder.mutation({
      query: body => ({
        url: 'user/addProfilePicture',
        method: 'POST',
        body: body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['getUserProfilePicture'],
    }),
    addUserGallery: builder.mutation({
      query: body => ({
        url: 'user/addGallery',
        method: 'POST',
        body: body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['getUserDetails'],
    }),
    deleteGalleryImage: builder.mutation({
      query: id => ({
        url: `user/deleteGallery/${id}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['getUserDetails'],
    }),
    getAllUser: builder.query({
      query: (filterData: IDashBoardFilterData) => {
        const queryParams = `gender=${filterData.gender}&countryName=${filterData.countryName}&cityName=${filterData.cityName}&profession=${filterData.profession}&religion=${filterData.religion}&ageTo=${filterData.ageTo}&ageFrom=${filterData.ageFrom}`;
        return {
          url: `user/getNearestUsers?${queryParams}`,
          method: 'GET',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const result = await queryFulfilled;

          dispatch(setAllUserDetails(result?.data));
          dispatch(
            userApiSlice.util.updateQueryData(
              'getAllUser',
              args,
              draft => result?.data,
            ),
          );
          dispatch(setLoading(false));
        } catch (e) {
          dispatch(setLoading(false));
          console.error(e);
        }
      },
      providesTags: ['getAllUser'],
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: 'user/getUserDetails',
        method: 'GET',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const result = await queryFulfilled;
          dispatch(setUserProfile(result?.data));
          dispatch(
            userApiSlice.util.updateQueryData(
              'getUserDetails',
              args,
              draft => result?.data,
            ),
          );
          dispatch(setLoading(false));
        } catch (e) {
          dispatch(setLoading(false));
          console.error(e);
        }
      },
      providesTags: ['getUserDetails'],
    }),
    getGenderList: builder.query({
      query: () => ({
        url: 'gender/getGender',
        method: 'GET',
      }),
    }),
    getProfessionList: builder.query({
      query: () => ({
        url: 'Profession/getAllProfession',
        method: 'GET',
      }),
    }),
    getReligionList: builder.query({
      query: () => ({
        url: 'religion/getReligion',
        method: 'GET',
      }),
    }),
    checkGender: builder.query({
      query: () => ({
        url: 'user/checkGender',
        method: 'GET',
      }),
    }),
    checkprofile: builder.query({
      query: () => ({
        url: 'user/checkprofile',
        method: 'GET',
      }),
    }),
    checkAddesLine: builder.query({
      query: () => ({
        url: 'user/checkAddesLine',
        method: 'GET',
      }),
    }),
    checkInterest: builder.query({
      query: () => ({
        url: 'user/checkInterest',
        method: 'GET',
      }),
    }),
    addUserLocation: builder.mutation({
      query: (userLocation: IUserLocationData) => ({
        url: 'user/addUserLocation',
        method: 'POST',
        body: userLocation,
      }),
    }),
    getSingleUserDetails: builder.query({
      query: uid => ({
        url: `user/getSingleUserDetails?uid=${uid}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useUpdateUserDataMutation,
  useAddUserProfileMutation,
  useAddUserGalleryMutation,
  useGetAllUserQuery,
  useGetUserDetailsQuery,
  useGetGenderListQuery,
  useGetProfessionListQuery,
  useGetReligionListQuery,
  useCheckAddesLineQuery,
  useCheckGenderQuery,
  useCheckInterestQuery,
  useCheckprofileQuery,
  useAddUserLocationMutation,
  useGetSingleUserDetailsQuery,
  useDeleteGalleryImageMutation,
  useResetUserDetailsMutation,
} = userApiSlice;
