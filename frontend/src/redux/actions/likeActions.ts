import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import globalConfig from "../../configs/global.config";

const backendURL = globalConfig.SERVER_HOST

interface getUserProps {
    postid: string
}

export const getLike = createAsyncThunk(
    'like/getlike',
    async ({postid}: getUserProps, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem('token');

            const response = await axios.post(
                `${backendURL}/api/posts/getlike`,
                { postid, token},
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const keepLike = createAsyncThunk(
    'like/keeplike',
    async ({postid}: getUserProps, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem('token');

            const response = await axios.post(
                `${backendURL}/api/posts/keeplike`,
                { postid, token},
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)