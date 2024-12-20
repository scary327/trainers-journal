import { AxiosResponse } from "axios";
import { api } from "../api";

export const getWalletApi = async (
    userName: string
): Promise<AxiosResponse<{ balance: number }>> => {
    return await api.get(`/wallets?userName=${userName}`);
};
export const getWallet = async (userName: string): Promise<{ balance: number }> => {
    const response = await getWalletApi(userName);
    return response.data;
};
