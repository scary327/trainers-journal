import { IClass } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { api } from "../api";
import { IUser } from "@/entities/user/model/user.types";

export const getPracticesApi = async (user: IUser): Promise<AxiosResponse<IClass[]>> => {
    return await api.get(
        user.roles.includes("Trainer")
            ? `/practices/trainer/${user.userName}`
            : `/practices/student/${user.userName}`
    );
};

export const getPractices = createAsyncThunk("practice/get", async (user: IUser) => {
    const response = await getPracticesApi(user);
    return response.data;
});
