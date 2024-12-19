import { api } from "../api";
import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStudent } from "@/widgets";
import { IAuthData } from "@/entities/user/model/user.reducer";

export const postStudentApi = async (data: IStudent): Promise<AxiosResponse<IAuthData>> => {
    return await api.post(`/students`, data);
};

export const postStudent = createAsyncThunk("students/post", async (data: IStudent) => {
    const response = await postStudentApi(data);
    return response.data;
});
