import { AxiosResponse } from "axios";
import { api } from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetContacts } from "./getStudentContacts";

export const deleteStudentContactsApi = async (
    contact: IGetContacts
): Promise<AxiosResponse<string>> => {
    return await api.delete(`/students/contacts${contact.contactId}`);
};

export const deleteStudentContacts = createAsyncThunk(
    "practice/delete",
    async (contact: IGetContacts) => {
        const response = await deleteStudentContactsApi(contact);
        return response.data;
    }
);
