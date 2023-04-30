import { createSlice } from '@reduxjs/toolkit';
import { createPost, deletePost, editPost, getPost, getPosts } from '../actions/postsActions';
import { getLike } from '../actions/likeActions';

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
            state.posts = payload.posts 
        })
        builder.addCase(getPost.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // create post
        builder.addCase(createPost.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(createPost.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.posts = {...state.posts, ...payload.newpost} 
            window.location.href = '/admin/blog';
        })
        builder.addCase(createPost.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // delete post
        builder.addCase(deletePost.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(deletePost.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.posts = payload.newpost 
            window.location.href = '/admin/blog';
        })
        builder.addCase(deletePost.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // edit post
        builder.addCase(editPost.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(editPost.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.posts = payload.posts 
            window.location.href = '/admin/blog';
        })
        builder.addCase(editPost.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default postsSlice.reducer;