import { IAuthData } from "@/entities/user/model/user.reducer";
import { IUser } from "@/entities/user/model/user.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { URL } from "../api";

export const signInUserApi = async (data: IAuthData): Promise<AxiosResponse<IUser>> => {
    try {
        const response = await axios.post(`${URL}/auth/signin`, data);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message);
    }
};

export const signIn = createAsyncThunk("auth/signin", async (data: IAuthData) => {
    const response = await signInUserApi(data);
    return response.data;
});
