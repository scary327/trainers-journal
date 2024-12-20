import { api } from "../api";
import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPracticeForm } from "@/features/calendar/ui/editPracticeContent/editPracticeContent";

export const postPracticeApi = async (
    data: IPracticeForm
): Promise<AxiosResponse<IPracticeForm>> => {
    return await api.post(`/practices`, data);
};

export const postPractice = createAsyncThunk("practice/post", async (data: IPracticeForm) => {
    const response = await postPracticeApi(data);
    return response.data;
});
