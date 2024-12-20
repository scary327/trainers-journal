import { AxiosResponse } from "axios";
import { api } from "../api";
import { IWorkoutStudent } from "@/features/calendar/ui/modal-workout-content/modalWorkoutContent";
import { ICreatePayment } from "@/features/paymentHistory/ui/paymentRow/model/payment.types";

export const postPaymentApi = async (
    data: ICreatePayment,
    userName: string
): Promise<AxiosResponse<IWorkoutStudent[]>> => {
    return await api.post(`/payments?studentUserName=${userName}`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};
export const postPayment = async (data: ICreatePayment, userName: string): Promise<number> => {
    const response = await postPaymentApi(data, userName);
    return response.status;
};
