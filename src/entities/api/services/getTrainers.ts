import { AxiosResponse } from "axios";
import { api } from "../api";

export interface ITrainers {
    trainerId: string;
    firstName: string;
    lastName: string;
    middleName: string;
}

export const getTrainersApi = async (userName: string): Promise<AxiosResponse<ITrainers[]>> => {
    return await api.get(`/trainer?userName=${userName}`);
};
export const getTrainers = async (userName: string): Promise<ITrainers[]> => {
    const response = await getTrainersApi(userName);
    return response.data;
};
