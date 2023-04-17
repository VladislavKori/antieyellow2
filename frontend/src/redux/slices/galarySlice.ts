import { createSlice } from '@reduxjs/toolkit';
import { getPhotos } from '../actions/galaryActions';

interface IinitialState {
    loading: boolean
    photos: any
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    photos: null,
    error: null,
    success: false,
} as IinitialState;

const galarySlice = createSlice({
    name: 'galary',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // get photos
        builder.addCase(getPhotos.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getPhotos.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.photos = payload.photos
        })
        builder.addCase(getPhotos.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default galarySlice.reducer;