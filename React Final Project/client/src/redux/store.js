import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user.tsx";

export const store = configureStore({
    reducer: {
        user:userReducer
    },
})

