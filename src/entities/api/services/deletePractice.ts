import { AxiosResponse } from "axios";
import { api } from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deletePracticeApi = async (practiceId: string): Promise<AxiosResponse<string>> => {
    return await api.delete(`/practices/${practiceId}`);
};

export const deletePractice = createAsyncThunk("practice/delete", async (practiceId: string) => {
    const response = await deletePracticeApi(practiceId);
    return response.data;
});
