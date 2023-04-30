import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import globalConfig from "../../configs/global.config";

const backendURL = globalConfig.SERVER_HOST

interface getUserProps {
    id: string
}

export const getUser = createAsyncThunk(
    'user/getuser',
    async ({id}: getUserProps, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const response = await axios.get(
                `${backendURL}/api/user/${id}`,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)