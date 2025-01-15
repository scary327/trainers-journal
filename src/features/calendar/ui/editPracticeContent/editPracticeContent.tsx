import { classnames } from "@/shared/lib";
import { Typography, Select, Button, Input, DateInput } from "@/shared/ui";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import * as styles from "./editPracticeContent.module.css";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { getPractices, postPractice, putPractice } from "@/entities/api/services";
import { DateRange, IGroup } from "@/shared/types";
import { setCurrentWorkout } from "@/pages/calendarPage/model/calendar.reducer";

export interface IPracticeForm {
    groupId?: string;
    practiceId?: string;
    date?: string;
    timeStart: string;
    timeEnd: string;
}

interface IEditPracticeContentProps {
    isEdit: boolean;
}

export const EditPracticeContent = ({ isEdit }: IEditPracticeContentProps) => {
    const slideOutTitle: string = !isEdit ? "Создание занятия" : "Редактирование занятия";
    const buttonTitle: string = !isEdit ? "Создать" : "Сохранить";

    const dispatch = useDispatch<AppDispatch>();
    const [groupValue, setGroupValue] = useState<string>("");

    const groupsOptions = useSelector((state: RootState) =>
        state.groups.groups.map((group) => ({
            value: group.id,
            label: group.name
        }))
    );

    const groups = useSelector((state: RootState) => state.groups.groups);

    const { register, handleSubmit, reset } = useForm<IPracticeForm>();

    const [date, setDate] = useState<DateRange>({
        start: null,
        end: null
    });

    const user = useSelector((state: RootState) => state.user.user);

    const workout = useSelector((state: RootState) => state.practices.currentWorkout);

    useEffect(() => {
        if (workout) {
            // Если student существует, обновляем значения формы
            setGroupValue((groups.find((g) => g.name === workout.groupName) as IGroup).id);
            // setGenderValue(student.studentInfoItemDto.gender.toString());
            setDate({ start: new Date(workout.date), end: null });
        } else {
            // Если student отсутствует, сбрасываем форму
            setGroupValue("");
        }
    }, []);

    const onSubmit: SubmitHandler<IPracticeForm> = (data) => {
        if (!date.start) {
            console.error("Дата не выбрана"); // Логирование ошибки
            return; // Прерываем выполнение, если дата отсутствует
        }
        const todayISO = new Date(date.start).toLocaleDateString("en-CA");

        if (!workout) {
            // Create Practice
            dispatch(
                postPractice({
                    timeEnd: data.timeEnd,
                    timeStart: data.timeStart,
                    groupId: groupValue,
                    date: todayISO
                })
            ).then(() => {
                dispatch(getPractices(user));
            });
        } else {
            // Edit Practice
            dispatch(
                putPractice({
                    timeEnd: data.timeEnd,
                    timeStart: data.timeStart,
                    practiceId: workout.practiceId,
                    date: todayISO
                })
            ).then(() => {
                dispatch(getPractices(user));
                dispatch(
                    setCurrentWorkout({
                        ...workout,
                        timeEnd: data.timeEnd,
                        timeStart: data.timeStart,
                        date: todayISO,
                        groupName: groups.find((g) => g.id === groupValue)!.name
                    })
                );
            });
        }

        reset();
    };

    return (
        <>
            <Typography variant="text_16_b">{slideOutTitle}</Typography>
            <form
                className={classnames(styles.form_container, "scrollbar-webkit")}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Select
                    label="Группа"
                    options={groupsOptions}
                    value={groupValue}
                    onChange={(value) => setGroupValue(value)}
                />
                <DateInput
                    className="w-full"
                    onlyOneDate={true}
                    selectedRange={date}
                    setSelectedRange={setDate}
                />
                <Input
                    className="w-full"
                    type="time"
                    {...register("timeStart")}
                    min="06:00"
                    max="23:00"
                    defaultValue={workout?.timeStart}
                />
                <Input
                    className="w-full"
                    type="time"
                    {...register("timeEnd")}
                    min="06:00"
                    max="23:00"
                    defaultValue={workout?.timeEnd}
                />
                <Button variant="primary" className="w-[100%]" type="submit">
                    {buttonTitle}
                </Button>
            </form>
        </>
    );
};
