import { createSlice } from '@reduxjs/toolkit';
import { register, login, refresh } from '../actions/userActions';

interface IinitialState {
    loading: boolean
    userInfo: any
    isAuth: boolean,
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    userInfo: null,
    isAuth: false,
    error: null,
    success: false,
} as IinitialState;

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // register
        builder.addCase(register.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.isAuth = true
            state.userInfo = payload
        })
        builder.addCase(register.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // login
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(login.fulfilled, (state, {payload}) => {
            state.loading = false
            state.success = true
            state.isAuth = true
            state.userInfo = payload
        })
        builder.addCase(login.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // refresh
        builder.addCase(refresh.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(refresh.fulfilled, (state, {payload}) => {
            state.loading = false
            state.success = true
            state.isAuth = true
            state.userInfo = payload
        })
        builder.addCase(refresh.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default authSlice.reducer;