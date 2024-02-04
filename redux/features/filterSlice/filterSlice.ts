import { RootState } from '@store/index';

import { createSlice } from '@reduxjs/toolkit';
import { IDashBoardFilterData } from './filterSlice.types';

const initialState: IDashBoardFilterData = {
    gender: '',
    countryName: '',
    cityName: '',
    profession: '',
    religion: '',
    ageTo: '',
    ageFrom: '',
};

export const filterSlice = createSlice({
    name: 'filterData',
    initialState,
    reducers: {
        setFilterData(state, action) {
            state.gender = action.payload?.gender || "";
            state.countryName = action.payload?.countryName || "";
            state.cityName = action.payload?.cityName || "";
            state.profession = action.payload?.profession || "";
            state.religion = action.payload?.religion || "";
            state.ageTo = action.payload?.ageTo || "";
            state.ageFrom = action.payload?.ageFrom || "";
        },
    },
});

export const { setFilterData } = filterSlice.actions;

export const selectfilterData = (state: RootState) => state.filterData;

const filterReducer = filterSlice.reducer;

export default filterReducer;
