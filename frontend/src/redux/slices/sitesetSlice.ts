import { createSlice } from '@reduxjs/toolkit';
import { changePassword, changeSocials } from '../actions/settingsActions';
import { changeCommonSettings, getCommonSettings } from '../actions/sitesetActions';

interface IinitialState {
    loading: boolean
    commonSettings: any
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    commonSettings: null,
    error: null,
    success: false,
} as IinitialState;

const commonSettings = createSlice({
    name: 'settings',
    initialState,
    reducers: {

    },
    extraReducers(builder) {

        // get Common Settingss
        builder.addCase(getCommonSettings.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getCommonSettings.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.commonSettings = payload
        })
        builder.addCase(getCommonSettings.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // change Settings
        builder.addCase(changeCommonSettings.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(changeCommonSettings.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.commonSettings = payload
        })
        builder.addCase(changeCommonSettings.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default commonSettings.reducer;