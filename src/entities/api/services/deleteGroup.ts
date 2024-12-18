import { AxiosResponse } from "axios";
import { api } from "../api";
import { IGroup } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteGroupApi = async (data: string): Promise<AxiosResponse<IGroup>> => {
    return await api.delete(`/groups/${data}`);
};

export const deleteGroup = createAsyncThunk("groups/delete", async (data: string) => {
    const response = await deleteGroupApi(data);
    return response.data;
});
