import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import globalConfig from "../../configs/global.config";

const backendURL = globalConfig.SERVER_HOST

interface ChangePasswordProps {
    currentPassword: string
    newPassword: string
}

export const changePassword = createAsyncThunk(
    'settings/changePassword',
    async ({ currentPassword, newPassword }: ChangePasswordProps, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }   

            const token = localStorage.getItem('token')

            const response = await axios.put(
                `${backendURL}/api/user/changepassword`,
                { token, currentPassword, newPassword },
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

interface ChangeSocialsProps {
    vklink: string
    tglink: string
}

export const changeSocials = createAsyncThunk(
    'settings/changeSocials',
    async ({ vklink, tglink }: ChangeSocialsProps, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }   

            const token = localStorage.getItem('token')

            const response = await axios.put(
                `${backendURL}/api/user/changesettings`,
                { token, vklink, tglink },
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)