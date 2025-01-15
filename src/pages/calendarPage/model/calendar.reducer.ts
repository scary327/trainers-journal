import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletePractice, getPractices, postPractice, putPractice } from "@/entities/api/services";
import { IAuthData } from "@/entities/user/model/user.reducer";
import { IClass } from "@/shared/types";

export interface PracticeSlice {
    isLoading: boolean;
    errorMessage: string;
    practices: IClass[];
    authData: IAuthData | null;
    currentWorkout?: IClass;
}

const initialState: PracticeSlice = {
    isLoading: false,
    errorMessage: "",
    practices: [],
    authData: null
};

const practiceSlice = createSlice({
    name: "practices",
    initialState,
    reducers: {
        // Редьюсер для установки текущей тренировки
        setCurrentWorkout: (state, action: PayloadAction<IClass>) => {
            state.currentWorkout = action.payload;
        },
        // Редьюсер для очистки текущей тренировки
        clearCurrentWorkout: (state) => {
            state.currentWorkout = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getPractices.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPractices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.practices = action.payload;
            })
            .addCase(getPractices.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            })
            // POST
            .addCase(postPractice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postPractice.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(postPractice.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            })
            // PUT
            .addCase(putPractice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(putPractice.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(putPractice.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            })
            // DELETE
            .addCase(deletePractice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePractice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.practices = state.practices.filter(
                    (item) => item.practiceId != action.payload
                );
            })
            .addCase(deletePractice.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            });
    }
});
export const { setCurrentWorkout, clearCurrentWorkout } = practiceSlice.actions;
export default practiceSlice.reducer;
