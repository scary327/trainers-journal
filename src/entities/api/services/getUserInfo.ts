import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { IUserInfo } from "@/entities/user/model/user.types";
import { AxiosResponse } from "axios";

interface IGetUserInfo {
    userName: string;
}

export const getUserInfoApi = async (data: IGetUserInfo): Promise<AxiosResponse<IUserInfo>> => {
    return await api.get(`/trainer/info?userName=${data.userName}`);
};

export const getUserInfo = createAsyncThunk("auth/getinfo", async (data: IGetUserInfo) => {
    const response = await getUserInfoApi(data);
    return response.data;
});
