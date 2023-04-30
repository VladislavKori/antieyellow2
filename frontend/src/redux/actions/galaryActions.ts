import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import globalConfig from "../../configs/global.config";

const backendURL = globalConfig.SERVER_HOST

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

export const createPhoto = createAsyncThunk(
    'galary/createPhoto',
    async ({data}: any, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 
                    "Content-Type": "multipart/form-data",
                },
            }

            const token = localStorage.getItem('token');
            data.append("token", token);

            const response = await axios.post(
                `${backendURL}/api/photos/create`,
                data,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

interface deletePhoto {
    photoid: number
}

export const deletePhoto = createAsyncThunk(
    'galary/deletePhoto',
    async ({photoid}: deletePhoto, { rejectWithValue }) => {
        try {
            
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem('token');

            const response = await axios.post(
                `${backendURL}/api/photos/delete`,
                {photoid, token},
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const editPhoto = createAsyncThunk(
    'galary/editPhoto',
    async ({data}: any, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 
                    "Content-Type": "multipart/form-data",
                },
            }

            const token = localStorage.getItem('token');
            data.append("token", token);

            const response = await axios.put(
                `${backendURL}/api/photos/edit`,
                data,
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)