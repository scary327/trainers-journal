import { AxiosResponse } from "axios";
import { api } from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IContact } from "@/widgets";

interface IPostContacts {
    userName: string;
    contacts: IContact[];
}

export const postStudentContactsApi = async (data: IPostContacts): Promise<AxiosResponse<[]>> => {
    return await api.post(`/students/contacts/${data.userName}`, data.contacts);
};

export const postStudentContacts = createAsyncThunk(
    "students/contacts/post",
    async (data: IPostContacts) => {
        const response = await postStudentContactsApi(data);
        return response.data;
    }
);
