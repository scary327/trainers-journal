import { IUser, IUserInfo } from "@/entities/user/model/user.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { api } from "../api";

export const putUserInfoApi = async (data: IUser): Promise<AxiosResponse<IUserInfo>> => {
    return await api.put(`/trainer/info?userName=${data.userName}`, data.info);
};

export const putUserInfo = createAsyncThunk("auth/putInfo", async (data: IUser) => {
    const response = await putUserInfoApi(data);
    return response.data;
});
