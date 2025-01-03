import { api } from "../api";

interface IPaymentPut {
    id: string;
    status: number;
}
// 0 - одобрен 1 - отклонен 2 - на рассмотрении
export const putPaymentsApi = async (data: IPaymentPut) => {
    return await api.put(`/payments/${data.id}`, {
        status: data.status
    });
};

export const putPayment = async (data: IPaymentPut) => {
    const response = await putPaymentsApi(data);
    return response.status;
};
