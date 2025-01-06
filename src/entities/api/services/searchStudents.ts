import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { api } from "../api";
import { IStudentInfo } from "@/widgets";

interface ISearch {
    userName: string;
    patternFullName: string;
}

export const searchStudentsApi = async (data: ISearch): Promise<AxiosResponse<IStudentInfo[]>> => {
    return await api.put(`students/search?trainerUserName=${data.userName}`, data);
};

export const searchStudents = createAsyncThunk("students/search", async (data: ISearch) => {
    const response = await searchStudentsApi(data);
    return response.data;
});
