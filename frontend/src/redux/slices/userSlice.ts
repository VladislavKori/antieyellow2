import { createSlice } from '@reduxjs/toolkit';
import { register, login, refresh, logout } from '../actions/userActions';

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
            console.log(payload)
        })
        builder.addCase(refresh.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // logout
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(logout.fulfilled, (state, {payload}) => {
            state.loading = false
            state.success = true
            state.isAuth = false
            state.userInfo = null
        })
        builder.addCase(logout.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default authSlice.reducer;