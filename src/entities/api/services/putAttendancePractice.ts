import { AxiosResponse } from "axios";
import { api } from "../api";
import {
    INewStatus,
    IWorkoutStudent
} from "@/features/calendar/ui/modal-workout-content/modalWorkoutContent";

export const putAttendancePracticeApi = async (
    data: INewStatus[]
): Promise<AxiosResponse<IWorkoutStudent[]>> => {
    return await api.put(`/attendance`, data);
};
export const putAttendancePractice = async (data: INewStatus[]): Promise<number> => {
    const response = await putAttendancePracticeApi(data);
    return response.status;
};
