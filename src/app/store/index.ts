import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/user/model/user.reducer";
import calendarReducer from "@/features/calendar/model/calendar.slice";
import groupReducer from "@/pages/groups/model/group.reducer";
import studentsReducer from "@/pages/userPage/model/students.reducer";
import practiceReducer from "@/pages/calendarPage/model/calendar.reducer";

export const mainStore = configureStore({
    reducer: {
        user: userReducer,
        calendar: calendarReducer,
        groups: groupReducer,
        students: studentsReducer,
        practices: practiceReducer
    }
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;
