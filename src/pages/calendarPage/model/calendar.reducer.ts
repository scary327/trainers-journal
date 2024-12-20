import { createSlice } from "@reduxjs/toolkit";
import { deletePractice, getPractices, postPractice } from "@/entities/api/services";
import { IAuthData } from "@/entities/user/model/user.reducer";
import { IClass } from "@/shared/types";

export interface PracticeSlice {
    isLoading: boolean;
    errorMessage: string;
    practices: IClass[];
    authData: IAuthData | null;
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
    reducers: {},
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

export default practiceSlice.reducer;
