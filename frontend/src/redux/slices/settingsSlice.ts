import { createSlice } from '@reduxjs/toolkit';
import { changePassword, changeSocials } from '../actions/settingsActions';

interface IinitialState {
    loading: boolean
    settings: any
    socialsSettings: any
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    settings: null,
    socialsSettings: null,
    error: null,
    success: false,
} as IinitialState;

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {

    },
    extraReducers(builder) {

        // changePassword
        builder.addCase(changePassword.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(changePassword.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.settings = payload
        })
        builder.addCase(changePassword.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // changeSocials
        builder.addCase(changeSocials.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(changeSocials.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.socialsSettings = payload
            window.location.reload()
        })
        builder.addCase(changeSocials.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default settingsSlice.reducer;