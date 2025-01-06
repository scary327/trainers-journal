import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { api } from "../api";
import { IStudentInfo } from "@/widgets";

interface IFilterData {
    trainerName: string;
    classes: number[];
    startDateOfBirth: string;
    endDateOfBirth: string;
    kyues: number[];
    genders: number[];
    groupsIds: string[];
}

export const filterStudentsApi = async (
    data: IFilterData
): Promise<AxiosResponse<IStudentInfo[]>> => {
    return await api.put(`students/filter?trainerUserName=${data.trainerName}`, data);
};

export const filterStudents = createAsyncThunk("students/filter", async (data: IFilterData) => {
    const response = await filterStudentsApi(data);
    return response.data;
});
