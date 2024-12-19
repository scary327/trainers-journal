import { AxiosResponse } from "axios";
import { api } from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStudent } from "@/widgets";

// interface IHeaderStudent
//     {
//       userName: "string",
//       firstName: "string",
//       lastName: "string",
//       middleName: "string",
//       groupName: "string",
//       walletBalance: 0,
//       kyu: 0
//     }

export const getStudentsApi = async (userName: string): Promise<AxiosResponse<IStudent[]>> => {
    return await api.get(`/students?trainerUserName=${userName}`);
};

export const getStudents = createAsyncThunk("students/get", async (userName: string) => {
    const response = await getStudentsApi(userName);
    return response.data;
});
