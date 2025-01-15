import { api } from "../api";
import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPracticeForm } from "@/features/calendar/ui/editPracticeContent/editPracticeContent";

export const putPracticeApi = async (
    data: IPracticeForm
): Promise<AxiosResponse<IPracticeForm>> => {
    return await api.put(`/practices`, data);
};

export const putPractice = createAsyncThunk("practice/put", async (data: IPracticeForm) => {
    const response = await putPracticeApi(data);
    return response.data;
});
