import { AxiosResponse } from "axios";
import { api } from "../api";
import { IPayment } from "@/features/paymentHistory/ui/paymentRow/model/payment.types";

export const getStudentsPaymentsApi = async (
    userName: string
): Promise<AxiosResponse<IPayment[]>> => {
    return await api.get(`/payments/students/${userName}`);
};
export const getStudentsPayments = async (userName: string): Promise<IPayment[]> => {
    const response = await getStudentsPaymentsApi(userName);
    return response.data;
};
