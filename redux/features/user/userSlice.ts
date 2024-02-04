import { RootState } from '@store/index';

import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from './userSlice.types';

const initialState: IUserState = {
    authMethodType: '',
    allUserDetails: {
        data: [],
        message: '',
    },
    loading: false,
    userProfileDetails: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAuthMethodType(state, action) {
            state.authMethodType = action.payload?.authMethodType;
        },
        setAllUserDetails(state, action) {
            state.allUserDetails = action.payload;
        },
        removeSingleUserDetails(state, action) {
            const message = state.allUserDetails.message;
            const data = state.allUserDetails?.data?.filter(user => user.userID._id !== action.payload);
            const newData = {
                data,
                message
            };
            state.allUserDetails = newData;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setUserProfile(state, action) {
            state.userProfileDetails = action.payload;
        }
    },
});

export const { userAuthMethodType, setAllUserDetails, removeSingleUserDetails, setLoading, setUserProfile } = userSlice.actions;
export const selectAllUserDetails = (state: RootState) => state.user.allUserDetails;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectUserProfile = (state: RootState) => state.user.userProfileDetails;

const userReducer = userSlice.reducer;

export default userReducer;
