import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/user/model/user.reducer";
import calendarReducer from "@/features/calendar/model/calendar.slice";

export const mainStore = configureStore({
    reducer: {
        user: userReducer,
        calendar: calendarReducer
    }
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;
