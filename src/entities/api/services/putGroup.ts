import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { AxiosResponse } from "axios";
import { IGroup } from "@/shared/types";

interface IGroupPut {
    id: string;
    name: string;
    costPractice: number;
}

export const putGroupApi = async (data: IGroupPut): Promise<AxiosResponse<IGroup>> => {
    return await api.put(`/groups/${data.id}`, {
        name: data.name,
        costPractice: data.costPractice
    });
};

export const putGroup = createAsyncThunk("groups/put", async (data: IGroupPut) => {
    const response = await putGroupApi(data);
    return response.data;
});
