import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import globalConfig from "../../configs/global.config";

const backendURL = globalConfig.SERVER_HOST

export const getCommonSettings = createAsyncThunk(
    'commonsettings/get',
    async (_, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }   

            const response = await axios.get(
                `${backendURL}/api/settings/getsettings`,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const changeCommonSettings = createAsyncThunk(
    'commonsettings/change',
    async (data: any, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': "multipart/form-data" },
            }   

            const token = localStorage.getItem('token');

            data.append('token', token)

            const response = await axios.post(
                `${backendURL}/api/settings/change`,
                data,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)