import { createSlice } from '@reduxjs/toolkit';
import { register, login, refresh, logout, vkAuth } from '../actions/authActions';

interface IinitialState {
    loading: boolean
    userInfo: any
    isAuth: boolean,
    isAdmin: boolean
    error: any
    success: boolean
}

const isAdmin = (array: Array<string>) => {
    let isAdmin = false;
    array.map(item => {
        if (item == "ROLE_ADMIN") {
            isAdmin = true;
        }
    })
    return isAdmin;
}

const initialState = {
    loading: false,
    userInfo: null,
    isAuth: false,
    isAdmin: false,
    error: null,
    success: false,
} as IinitialState;

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null
        }
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
            state.isAdmin = isAdmin(payload.roles);

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
            state.isAdmin = isAdmin(payload.roles);
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

        // auth vk
        builder.addCase(vkAuth.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(vkAuth.fulfilled, (state, {payload}) => {
            state.loading = false
            state.success = true
            console.log(payload)
        })
        builder.addCase(vkAuth.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default authSlice.reducer;

export const { clearError } = authSlice.actions