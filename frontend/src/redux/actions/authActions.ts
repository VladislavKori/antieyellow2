import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import globalConfig from "../../configs/global.config";

const backendURL = globalConfig.SERVER_HOST

interface registerProps {
    username: string
    email: string
    password: string
}

export const register = createAsyncThunk(
    'user/register',
    async ({ username, email, password }: registerProps, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }

            const response = await axios.post(
                `${backendURL}/api/auth/signup`,
                { username, email, password },
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

interface loginProps {
    email: string
    password: string
}

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: loginProps, { rejectWithValue }) => {
        try {
            const config = {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }

            const response = await axios.post(
                `${backendURL}/api/auth/signin`,
                { email, password },
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const refresh = createAsyncThunk(
    'user/refresh',
    async (_, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }

            const response = await axios.get(
                `${backendURL}/api/auth/refresh`,
                config
            );

            localStorage.setItem('token', response.data.accessToken);

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }

            const response = await axios.get(
                `${backendURL}/api/auth/logout`,
                config
            );

            localStorage.removeItem('token');
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const vkAuth = createAsyncThunk(
    'user/authvk',
    async (_, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }

            const response = await axios.get(
                `${backendURL}/api/auth/vkontakte`,
                config
            );


            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)