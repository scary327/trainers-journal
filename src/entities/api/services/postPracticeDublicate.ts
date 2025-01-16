import { api } from "../api";
import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IDublicate {
    userName: string;
    dateStartCopy: string;
    dateEndCopy: string;
    dateStartPaste: string;
    dateEndPaste: string;
}

export const postPracticeDublicateApi = async (
    data: IDublicate
): Promise<AxiosResponse<string>> => {
    return await api.post(`practices/duplicate?userName=${data.userName}`, data);
};

export const postPracticeDublicate = createAsyncThunk(
    "practice/dublicate",
    async (data: IDublicate) => {
        const response = await postPracticeDublicateApi(data).catch((error) => {
            throw new Error(error.response.data);
        });
        return response;
    }
);
