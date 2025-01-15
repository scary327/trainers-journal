import { classnames } from "@/shared/lib";
import { Typography, Select, Button, Input, DateInput } from "@/shared/ui";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import * as styles from "./editPracticeContent.module.css";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { getPractices, postPractice } from "@/entities/api/services";
import { DateRange } from "@/shared/types";

export interface IPracticeForm {
    groupId: string;
    practiceId?: string;
    date?: string;
    timeStart: string;
    timeEnd: string;
}

export const EditPracticeContent = () => {
    const slideOutTitle: string = "Создание занятия";
    const buttonTitle: string = "Создать";

    const dispatch = useDispatch<AppDispatch>();
    const [groupValue, setGroupValue] = useState<string>("");

    const groupsOptions = useSelector((state: RootState) =>
        state.groups.groups.map((group) => ({
            value: group.id,
            label: group.name
        }))
    );

    const { register, handleSubmit, reset } = useForm<IPracticeForm>();

    const [date, setDate] = useState<DateRange>({
        start: null,
        end: null
    });

    const user = useSelector((state: RootState) => state.user.user);

    const addOneDay = (date: Date): Date => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    };

    const onSubmit: SubmitHandler<IPracticeForm> = (data) => {
        if (!date.start) {
            console.error("Дата не выбрана"); // Логирование ошибки
            return; // Прерываем выполнение, если дата отсутствует
        }

        const adjustedDate = addOneDay(date.start)?.toISOString().split("T")[0];

        dispatch(
            postPractice({
                timeEnd: data.timeEnd + ":00",
                timeStart: data.timeStart + ":00",
                groupId: groupValue,
                date: adjustedDate
            })
        ).then(() => {
            dispatch(getPractices(user));
        });

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
                />
                <Input
                    className="w-full"
                    type="time"
                    {...register("timeEnd")}
                    min="06:00"
                    max="23:00"
                />
                <Button variant="primary" className="w-[80%]" type="submit">
                    {buttonTitle}
                </Button>
            </form>
        </>
    );
};
