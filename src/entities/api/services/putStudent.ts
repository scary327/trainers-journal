import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { api } from "../api";
import { IStudentInfo } from "@/widgets";

interface IPutStudent {
    userName: string;
    data: IStudentInfo;
}

export const putStudentApi = async (data: IPutStudent): Promise<AxiosResponse<IStudentInfo>> => {
    return await api.put(`/students/${data.userName}`, data.data);
};

export const putStudent = createAsyncThunk("students/put", async (data: IPutStudent) => {
    const response = await putStudentApi(data);
    return response.data;
});
