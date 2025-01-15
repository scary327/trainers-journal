import { api } from "../api";
import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPracticeForm } from "@/features/calendar/ui/editPracticeContent/editPracticeContent";

export const postPracticeApi = async (data: IPracticeForm): Promise<AxiosResponse<void>> => {
    return await api.post(`/practices`, data);
};

export const postPractice = createAsyncThunk("practice/post", async (data: IPracticeForm) => {
    const response = await postPracticeApi(data).catch((error) => {
        throw new Error(error.response.data);
    });
    return response;
});
