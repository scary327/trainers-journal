import { api } from "../api";
import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteStudentApi = async (userName: string): Promise<AxiosResponse<void>> => {
    return await api.delete(`/auth?userName=${userName}`);
};

export const deleteStudent = createAsyncThunk("students/delete", async (userName: string) => {
    const response = await deleteStudentApi(userName);
    return response;
});
