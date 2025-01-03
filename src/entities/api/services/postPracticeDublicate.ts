import { api } from "../api";
import { AxiosResponse } from "axios";
import { IPracticeForm } from "@/features/calendar/ui/editPracticeContent/editPracticeContent";

interface IDublicate {
    userName: string;
    dateStartCopy: string;
    dateEndCopy: string;
    dateStartPaste: string;
    dateEndPaste: string;
}

export const postPracticeDublicateApi = async (
    data: IDublicate
): Promise<AxiosResponse<IPracticeForm>> => {
    return await api.post(`practices/duplicate?userName=${data.userName}`, data);
};

export const postPracticeDublicate = async (data: IDublicate) => {
    const response = await postPracticeDublicateApi(data);
    return response.data;
};
