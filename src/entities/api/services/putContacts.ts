import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { api } from "../api";
import { IStudentInfo } from "@/widgets";
import { IGetContacts } from "./getStudentContacts";

export const putStudentContactsApi = async (
    data: IGetContacts[]
): Promise<AxiosResponse<IStudentInfo>> => {
    return await api.put(`/students/contacts`, data);
};

export const putStudentContacts = createAsyncThunk(
    "students/contacst/put",
    async (data: IGetContacts[]) => {
        const response = await putStudentContactsApi(data);
        return response.data;
    }
);
