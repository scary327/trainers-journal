import { AxiosResponse } from "axios";
import { api } from "../api";
import { IWorkoutStudent } from "@/features/calendar/ui/modal-workout-content/modalWorkoutContent";

export const getAttendancePracticeApi = async (
    practiceId: string
): Promise<AxiosResponse<IWorkoutStudent[]>> => {
    return await api.get(`/attendance/practices/${practiceId}`);
};
export const getAttendancePractice = async (practiceId: string): Promise<IWorkoutStudent[]> => {
    const response = await getAttendancePracticeApi(practiceId);
    return response.data;
};
