import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { api } from "../api";
import { IGroup } from "@/shared/types";

interface ISearch {
    userName: string;
    patternSearch: string;
}

export const searchGroupsApi = async (data: ISearch): Promise<AxiosResponse<IGroup[]>> => {
    return await api.put(`groups/search?userName=${data.userName}`, data);
};

export const searchGroups = createAsyncThunk("groups/search", async (data: ISearch) => {
    const response = await searchGroupsApi(data);
    return response.data;
});
