import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/user/model/user.reducer";
import calendarReducer from "@/features/calendar/model/calendar.slice";
import groupReducer from "@/pages/groups/model/group.reducer";
import studentsReducer from "@/pages/userPage/model/students.reducer";

export const mainStore = configureStore({
    reducer: {
        user: userReducer,
        calendar: calendarReducer,
        groups: groupReducer,
        students: studentsReducer
    }
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;
