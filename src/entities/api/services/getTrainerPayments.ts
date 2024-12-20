import { AxiosResponse } from "axios";
import { api } from "../api";
import { IPayment } from "@/features/paymentHistory/ui/paymentRow/model/payment.types";

export const getTrainerPaymentsApi = async (
    userName: string
): Promise<AxiosResponse<IPayment[]>> => {
    return await api.get(`/payments/trainers/${userName}`);
};
export const getTrainerPayments = async (userName: string): Promise<IPayment[]> => {
    const response = await getTrainerPaymentsApi(userName);
    return response.data;
};
