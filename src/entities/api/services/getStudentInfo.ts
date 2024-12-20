import { AxiosResponse } from "axios";
import { api } from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStudentInfo } from "@/widgets";

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

export const getStudentInfoApi = async (userName: string): Promise<AxiosResponse<IStudentInfo>> => {
    return await api.get(`/students/${userName}`);
};

export const getStudentInfo = createAsyncThunk("students/getInfo", async (userName: string) => {
    const response = await getStudentInfoApi(userName);
    return response.data;
});
