import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/user/model/user.reducer";

export const mainStore = configureStore({
    reducer: {
        user: userReducer
    }
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;
