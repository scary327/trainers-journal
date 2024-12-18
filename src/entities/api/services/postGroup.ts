import { IGroup } from "@/shared/types";
import { api } from "../api";
import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IGroupsCreate {
    userName: string;
    name: string;
    costPractice: number;
}

export const postGroupApi = async (data: IGroupsCreate): Promise<AxiosResponse<IGroup>> => {
    return await api.post(`/groups?userName=${data.userName}`, {
        name: data.name,
        costPractice: data.costPractice
    });
};

export const postGroup = createAsyncThunk("groups/post", async (data: IGroupsCreate) => {
    const response = await postGroupApi(data);
    return response.data;
});
