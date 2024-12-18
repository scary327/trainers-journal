import { IGroup } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { api } from "../api";

export const getGroupsApi = async (userName: string): Promise<AxiosResponse<IGroup[]>> => {
    return await api.get(`/groups?userName=${userName}`);
};

export const getGroups = createAsyncThunk("groups/get", async (userName: string) => {
    const response = await getGroupsApi(userName);
    return response.data;
});
