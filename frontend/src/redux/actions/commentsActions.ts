import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import globalConfig from "../../configs/global.config";

const backendURL = globalConfig.SERVER_HOST

export const getComments = createAsyncThunk(
    'comments/getcomments',
    async ({postid}: any, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem('token') || null

            const response = await axios.post(
                `${backendURL}/api/posts/getcomments`,
                {postid, token},
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const createComment = createAsyncThunk(
    'comments/createcomment',
    async ({postid, text}: any, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem('token')

            const response = await axios.post(
                `${backendURL}/api/posts/createcomment`,
                {postid, text, token},
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const deleteComment = createAsyncThunk(
    'comments/deletecomment',
    async ({commentid}: any, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem('token')

            const response = await axios.post(
                `${backendURL}/api/posts/deletecomment`,
                {commentid, token},
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const keepLikeOnComment = createAsyncThunk(
    'comments/keeplikeoncomment',
    async ({commentid}: any, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem('token')

            const response = await axios.post(
                `${backendURL}/api/posts/keeplikeoncomment`,
                {commentid, token},
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const getLikeOnComments = createAsyncThunk(
    'comments/getLikeOnComments',
    async (_, { rejectWithValue }) => {
        try {

            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem('token')

            const response = await axios.post(
                `${backendURL}/api/posts/getLikeOnComments`,
                {token},
                config
            );

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)