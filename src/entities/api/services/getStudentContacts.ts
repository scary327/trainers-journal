import { AxiosResponse } from "axios";
import { api } from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IContact } from "@/widgets";

interface IGetContacts {
    contactId: string;
    contactItem: IContact;
}

export const getStudentContactsApi = async (
    userName: string
): Promise<AxiosResponse<IGetContacts[]>> => {
    return await api.get(`/students/contacts/${userName}`);
};

export const getStudentContacts = createAsyncThunk(
    "students/getContacts",
    async (userName: string) => {
        const response = await getStudentContactsApi(userName);
        return response.data;
    }
);
