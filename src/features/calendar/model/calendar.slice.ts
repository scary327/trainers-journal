import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changeWeek, getCurrentWeek } from "../utils";
import { RootState } from "@/app/store";

interface CalendarState {
    currentWeek: string[];
    selectedDate: string | null;
}

const initialState: CalendarState = {
    currentWeek: getCurrentWeek().map((date) => date.toISOString()),
    selectedDate: null
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setWeek(state, action: PayloadAction<string[]>) {
            state.currentWeek = action.payload;
        },
        selectDate(state, action: PayloadAction<string>) {
            state.selectedDate = action.payload;
        },
        nextWeek(state) {
            state.currentWeek = changeWeek(
                state.currentWeek.map((date) => new Date(date)),
                1
            ).map((date) => date.toISOString());
        },
        prevWeek(state) {
            state.currentWeek = changeWeek(
                state.currentWeek.map((date) => new Date(date)),
                -1
            ).map((date) => date.toISOString());
        }
    }
});

export const { selectDate, nextWeek, prevWeek } = calendarSlice.actions;

// Селектор для получения текущей недели
export const selectCurrentWeek = (state: RootState) => state.calendar.currentWeek;
// Селектор для получения выбранной даты
export const selectSelectedDate = (state: RootState) => state.calendar.selectedDate;

export default calendarSlice.reducer;
