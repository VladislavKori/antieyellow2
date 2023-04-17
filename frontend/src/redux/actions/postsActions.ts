import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const backendURL = 'http://localhost:3000'

export const getPosts = createAsyncThunk(
    'posts/getposts',
    async (_, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const response = await axios.get(
                `${backendURL}/api/posts`,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

interface IGetPost {
    id: string
}

export const getPost = createAsyncThunk(
    'posts/getpost',
    async ({id}: IGetPost, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const response = await axios.get(
                `${backendURL}/api/getpost/${id}`,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)