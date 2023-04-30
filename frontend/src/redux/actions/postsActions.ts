import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import globalConfig from "../../configs/global.config";

const backendURL = globalConfig.SERVER_HOST

export const getPosts = createAsyncThunk(
    'posts/getposts',
    async (_, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const response = await axios.get(
                `${backendURL}/api/posts/posts`,
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
                `${backendURL}/api/posts/getpost/${id}`,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const createPost = createAsyncThunk(
    'posts/createPost',
    async ({data}:any, { rejectWithValue }) => {
        try {

            const config = {
                headers: { "Content-Type": "multipart/form-data", },
            }

            const token = localStorage.getItem('token');
            data.append("token", token);

            const response = await axios.post(
                `${backendURL}/api/posts/createpost`,
                data,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)


export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async ({postid}:any, { rejectWithValue }) => {
        try {

            const config = {
                headers: { "Content-Type": "multipart/form-data", },
            }

            const token = localStorage.getItem('token');

            const response = await axios.post(
                `${backendURL}/api/posts/delete`,
                {
                    token,
                    postid
                },
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const editPost = createAsyncThunk(
    'posts/editPost',
    async ({data}:any, { rejectWithValue }) => {
        try {
            console.log('ef')
            const config = {
                headers: { "Content-Type": "multipart/form-data", },
            }

            const token = localStorage.getItem('token');
            data.append("token", token);

            const response = await axios.put(
                `${backendURL}/api/posts/change`,
                data,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)