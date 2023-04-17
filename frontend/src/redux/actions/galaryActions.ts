import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const backendURL = 'http://localhost:3000'

export const getPhotos = createAsyncThunk(
    'galary/photos',
    async (_, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const response = await axios.get(
                `${backendURL}/api/photos/`,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)