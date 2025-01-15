import { AxiosResponse } from "axios";
import { api } from "../api";

interface IChangePass {
    userName: string;
    currentPassword: string;
    newPassword: string;
}

export const postChangePassApi = async (data: IChangePass): Promise<AxiosResponse<string>> => {
    return await api.post(`/auth/changePassword`, data);
};

export const postChangePass = async (data: IChangePass): Promise<string> => {
    const response = await postChangePassApi(data);
    return response.data; // Теперь response.data будет содержать данные
};
