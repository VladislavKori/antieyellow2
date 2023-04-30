import { createSlice } from '@reduxjs/toolkit';
import { createPhoto, deletePhoto, editPhoto, getPhotos } from '../actions/galaryActions';

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
        reset(state) {
            state.error = null;
            state.success = false;
        }
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

        // get photos
        builder.addCase(createPhoto.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(createPhoto.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true

            delete payload.message
            state.photos = [...state.photos, {...payload}]
            window.location.reload()
        })
        builder.addCase(createPhoto.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
        
        // delete photos
        builder.addCase(deletePhoto.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(deletePhoto.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            
            state.photos = payload.photos
            window.location.reload()
        })
        builder.addCase(deletePhoto.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // edit photos
        builder.addCase(editPhoto.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(editPhoto.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            
            state.photos = payload.photos
            window.location.reload()
        })
        builder.addCase(editPhoto.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default galarySlice.reducer;

export const { reset } = galarySlice.actions