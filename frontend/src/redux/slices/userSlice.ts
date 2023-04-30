import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../actions/userActions';
import { changePassword } from '../actions/settingsActions';

interface IinitialState {
    loading: boolean
    user: any
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    user: null,
    error: null,
    success: false,
} as IinitialState;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // get posts
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.user = payload
        })
        builder.addCase(getUser.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default userSlice.reducer;