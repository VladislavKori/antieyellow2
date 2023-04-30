import { createSlice } from '@reduxjs/toolkit';
import { changePassword, changeSocials } from '../actions/settingsActions';
import { getLike, keepLike } from '../actions/likeActions';
import { createComment, deleteComment, getComments, getLikeOnComments, keepLikeOnComment } from '../actions/commentsActions';

interface IinitialState {
    loading: boolean
    comments: Array<any>
    error: any
    yourLikedComments: Array<any>
    success: boolean
}

const initialState = {
    loading: false,
    comments: [],
    yourLikedComments: [],
    error: null,
    success: false,
} as IinitialState;

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    },
    extraReducers(builder) {

        // Получаем комментарии
        builder.addCase(getComments.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getComments.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.comments = payload.comments
        })
        builder.addCase(getComments.rejected, (state, { payload }) => {
            state.loading = false
            console.log(payload)
            state.error = payload;
        })

        // Создаём комментарий
        builder.addCase(createComment.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(createComment.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.comments = [{ ...payload.newComment }, ...state.comments]
        })
        builder.addCase(createComment.rejected, (state, { payload }) => {
            state.loading = false
            console.log(payload)
            state.error = payload;
        })

        // Удаляем комментарии
        builder.addCase(deleteComment.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.comments = state.comments.filter((x) => x.id != payload.delcomment.id)
        })
        builder.addCase(deleteComment.rejected, (state, { payload }) => {
            state.loading = false
            console.log(payload)
            state.error = payload;
        })

        // Ставим или удаляем лайка на комментарий
        builder.addCase(keepLikeOnComment.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(keepLikeOnComment.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            // state.yourLikedComments = [...payload.likes]
            window.location.reload()
        })
        builder.addCase(keepLikeOnComment.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload;
        })

        // получаем лайки на комментарии
        builder.addCase(getLikeOnComments.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getLikeOnComments.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.yourLikedComments = [...payload.likes];
        })
        builder.addCase(getLikeOnComments.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default commentsSlice.reducer;