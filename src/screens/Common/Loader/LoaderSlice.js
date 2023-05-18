import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false
};

export const LoaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        showLoader: (state) => {
            state.isLoading = true;
        },
        hideLoader: (state) => {
            state.isLoading = false;
        }
    }
});

export const { showLoader, hideLoader } = LoaderSlice.actions;

export default LoaderSlice.reducer;