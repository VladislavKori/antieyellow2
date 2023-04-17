import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './slices/userSlice'
import GalaryReducer from './slices/galarySlice'
import PostReducer from './slices/postsSlice'

export const store = configureStore({
    reducer: {
        user: UserReducer,
        galary: GalaryReducer,
        posts: PostReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;