import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const backendURL = 'http://localhost:3000'

interface registerProps {
    username: string
    email: string
    password: string
}

const API_URL = 'http://localhost:3000'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export const register = createAsyncThunk(
    'user/register',
    async ({ username, email, password }: registerProps, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
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
                headers: {
                    'Content-Type': 'application/json',
                },
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

        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)