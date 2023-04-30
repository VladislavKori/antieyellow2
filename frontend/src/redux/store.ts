import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './slices/authSlice'
import GalaryReducer from './slices/galarySlice'
import PostReducer from './slices/postsSlice'
import UserReducer from './slices/userSlice'
import settingsSlice from "./slices/settingsSlice";
import sitesetSlice from "./slices/sitesetSlice";
import likeSlice from "./slices/likeSlice";
import commentsSlice from "./slices/commentsSlice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        galary: GalaryReducer,
        posts: PostReducer,
        user: UserReducer,
        settings: settingsSlice,
        commonSettings: sitesetSlice,
        likes: likeSlice,
        comments: commentsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;