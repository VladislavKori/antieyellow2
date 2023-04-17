import { createSlice } from '@reduxjs/toolkit';
import { getPost, getPosts } from '../actions/postsActions';

interface IinitialState {
    loading: boolean
    posts: Array<any> | null
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    posts: [],
    error: null,
    success: false,
} as IinitialState;

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // get posts
        builder.addCase(getPosts.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getPosts.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.posts = payload.posts
        })
        builder.addCase(getPosts.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // get post
        builder.addCase(getPost.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getPost.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.posts?.push(...payload.posts) 
        })
        builder.addCase(getPost.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default postsSlice.reducer;