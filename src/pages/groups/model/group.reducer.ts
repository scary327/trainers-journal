import { createSlice } from "@reduxjs/toolkit";
import { deleteGroup, getGroups, postGroup, putGroup, searchGroups } from "@/entities/api/services";
import { IGroup } from "@/shared/types";

interface IGroupSlice {
    isLoading: boolean;
    groups: IGroup[];
    errorMessage: string;
}

const initialState: IGroupSlice = {
    isLoading: true,
    groups: [],
    errorMessage: ""
};

const groupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get
            .addCase(getGroups.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGroups.fulfilled, (state, action) => {
                state.isLoading = false;
                state.groups = action.payload;
            })
            .addCase(getGroups.rejected, (state, action) => {
                state.errorMessage = action.error.message || "Неизвестная ошибка";
                state.isLoading = false;
            })
            // Create
            .addCase(postGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postGroup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.groups = [...state.groups, action.payload];
            })
            .addCase(postGroup.rejected, (state, action) => {
                state.errorMessage = action.error.message || "Неизвестная ошибка";
                state.isLoading = false;
            })
            // Delete
            .addCase(deleteGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGroup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.groups = state.groups.filter((group) => group.id != action.payload.id);
            })
            .addCase(deleteGroup.rejected, (state, action) => {
                state.errorMessage = action.error.message || "Неизвестная ошибка";
                state.isLoading = false;
            })
            // Put
            .addCase(putGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(putGroup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.groups = state.groups.map((group) =>
                    group.id === action.payload.id ? action.payload : group
                );
            })
            .addCase(putGroup.rejected, (state, action) => {
                state.errorMessage = action.error.message || "Неизвестная ошибка";
                state.isLoading = false;
            })
            // Search
            // .addCase(searchGroups.pending, (state) => {
            //     state.isLoading = true;
            // })
            .addCase(searchGroups.fulfilled, (state, action) => {
                state.isLoading = false;
                state.groups = action.payload;
            });
    }
});

export default groupSlice.reducer;
