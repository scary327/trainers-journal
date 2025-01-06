import { IClass } from "@/shared/types";

// import * as styles from "./modalWorkoutContent.module.css";
import { Button, Checkbox, Typography } from "@/shared/ui";
import { formatTime } from "../workout/workout";
import { getNormalTime } from "../body/CalendarBody";
import { useEffect, useState } from "react";
import {
    deletePractice,
    getAttendancePractice,
    putAttendancePractice
} from "@/entities/api/services";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";

interface IProps {
    workout: IClass;
    onClose: () => void;
}

export interface IWorkoutStudent {
    attendanceId: string;
    firstName: string;
    lastName: string;
    middleName: string;
    status: boolean;
}

export interface INewStatus {
    id: string;
    isAttend: boolean;
}

const StudentRow = ({
    student,
    check,
    setNewStatus
}: {
    student: IWorkoutStudent;
    check: boolean;
    setNewStatus: () => void;
}) => {
    return (
        <div className="grid w-full gap-x-[10px] grid-cols-[3fr_1fr]">
            <Typography variant="text_14_m" className="text-blue-dark">
                {student.lastName} {student.firstName} {student.middleName}
            </Typography>
            <div className="justify-self-center">
                <Checkbox check={check} setCheck={setNewStatus} />
            </div>
        </div>
    );
};

export const ModalWorkoutContent = ({ workout, onClose }: IProps) => {
    const startTime = formatTime(getNormalTime(workout.date, workout.timeStart));
    const endTime = formatTime(getNormalTime(workout.date, workout.timeEnd));

    const [students, setStudents] = useState<IWorkoutStudent[]>([]);
    const [newStatus, setNewStatus] = useState<INewStatus[]>([]); // Начинаем с пустого массива
    const user = useSelector((state: RootState) => state.user.user);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchStudents = async () => {
            const attendance = await getAttendancePractice(workout.practiceId);

            setStudents(attendance);

            // Теперь обновляем newStatus после загрузки студентов
            setNewStatus(
                attendance.map((item) => ({
                    id: item.attendanceId,
                    isAttend: item.status
                }))
            );
        };
        if (user.roles.includes("Trainer")) fetchStudents();
    }, [workout.practiceId]);

    const onSubmit = () => {
        const status = putAttendancePractice(newStatus);
        console.log(status);
    };

    const onDelete = () => {
        dispatch(deletePractice(workout.practiceId));
        onClose();
    };

    return (
        <div className="flex flex-col items-start gap-y-[20px]">
            <Typography variant="text_24_b" className="text-blue-dark mr-[30px]">
                Информация о тренировке
            </Typography>
            <div className="flex flex-col w-full gap-y-[10px] p-[10px] bg-blue-light rounded-[20px]">
                <div>
                    <Typography variant="text_14_r" className="text-gray-text">
                        Группа
                    </Typography>
                    <Typography variant="text_14_m" className="text-black">
                        {workout.groupName}
                    </Typography>
                </div>
                <div>
                    <Typography variant="text_14_r" className="text-gray-text">
                        Продолжительность
                    </Typography>
                    <Typography variant="text_14_m" className="text-black">
                        {startTime} - {endTime}
                    </Typography>
                </div>
                <div>
                    <Typography variant="text_14_r" className="text-gray-text">
                        Тренер
                    </Typography>
                    <Typography variant="text_14_m" className="text-black">
                        {workout.trainerLastName} {workout.trainerFirstName}{" "}
                        {workout.trainerMiddleName}
                    </Typography>
                </div>
                <div>
                    <Typography variant="text_14_r" className="text-gray-text">
                        Стоимость
                    </Typography>
                    <Typography variant="text_14_m" className="text-black">
                        {workout.cost} ₽
                    </Typography>
                </div>
            </div>
            {user.roles.includes("Trainer") && (
                <>
                    <div className="flex flex-col items-center w-full gap-y-[10px] p-[10px] max-h-[300px] overflow-auto rounded-[10px] bg-white border-blue-dark border-[1px]">
                        <div className="grid w-full gap-x-[10px] grid-cols-[3fr_1fr]">
                            <Typography variant="text_14_r" className="text-gray-text">
                                Студент
                            </Typography>
                            <Typography variant="text_14_r" className="text-gray-text text-center">
                                Пришел
                            </Typography>
                        </div>
                        {students.map((student) => (
                            <StudentRow
                                key={student.attendanceId}
                                student={student}
                                check={
                                    newStatus.find((item) => item.id === student.attendanceId)
                                        ?.isAttend || false
                                }
                                setNewStatus={() =>
                                    setNewStatus((prev) =>
                                        prev.map((item) =>
                                            item.id === student.attendanceId
                                                ? { ...item, isAttend: !item.isAttend } // инвертируем статус
                                                : item
                                        )
                                    )
                                }
                            />
                        ))}
                    </div>
                    <div className="self-end flex gap-x-[20px]">
                        <Button variant="cancel" onClick={() => onDelete()}>
                            Удалить
                        </Button>
                        <Button variant="empty" className="p-0">
                            Редактировать
                        </Button>
                        <Button variant="primary-small" onClick={() => onSubmit()}>
                            Сохранить
                        </Button>
                    </div>
                </>
            )}
            {user.roles.includes("Student") && (
                <Typography variant="text_16_m">
                    {workout.isAttend ? "Вы уже посетили это занятие" : "Вас ждут на этом занятии"}
                </Typography>
            )}
        </div>
    );
};
