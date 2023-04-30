import { createSlice } from '@reduxjs/toolkit';
import { changePassword, changeSocials } from '../actions/settingsActions';
import { getLike, keepLike } from '../actions/likeActions';

interface IinitialState {
    loading: boolean
    like: any
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    like: null,
    error: null,
    success: false,
} as IinitialState;

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {

    },
    extraReducers(builder) {

        // get like
        builder.addCase(getLike.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getLike.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.like = payload
        })
        builder.addCase(getLike.rejected, (state, {payload}) => {
            state.loading = false
            console.log(payload)
            state.error = payload;
        })

        // keep like
        builder.addCase(keepLike.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(keepLike.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.like = payload
        })
        builder.addCase(keepLike.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default likesSlice.reducer;