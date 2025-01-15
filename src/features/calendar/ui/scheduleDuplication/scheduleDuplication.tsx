import { AppDispatch, RootState } from "@/app/store";
import { getPractices, postPracticeDublicate } from "@/entities/api/services";
import { DateRange } from "@/shared/types";
import { Button, DateInput, Typography } from "@/shared/ui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ScheduleDuplication = () => {
    const [insertionRage, setInsertionRage] = useState<DateRange>({
        start: null,
        end: null
    });

    const [duplicationRage, setDuplicationRage] = useState<DateRange>({
        start: null,
        end: null
    });

    const userName = useSelector((state: RootState) => state.user.user.userName);

    const formatDate = (date: Date) => date.toISOString().slice(0, 10);

    let helperText: string = "";
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {}, [helperText]);

    const onSubmit = () => {
        if (
            !duplicationRage.start ||
            !duplicationRage.end ||
            !insertionRage.start ||
            !insertionRage.end
        ) {
            helperText = "Выберите диапозоны дублирования и вставки";
            return;
        }
        const result = {
            dateStartCopy: formatDate(duplicationRage.start!),
            dateEndCopy: formatDate(duplicationRage.end!),
            dateStartPaste: formatDate(insertionRage.start!),
            dateEndPaste: formatDate(insertionRage.end!)
        };
        postPracticeDublicate({ userName: userName, ...result }).then(() =>
            dispatch(getPractices(user))
        );
    };

    return (
        <div className="flex flex-col gap-y-[30px] h-[40vh]">
            <Typography variant="text_18_b" className="text-blue-dark">
                Дублирование расписания
            </Typography>
            <div className="flex gap-x-[30px] items-center">
                <div className="flex flex-col items-start gap-y-[10px]">
                    <Typography variant="text_14_m">Диапозон дублирования</Typography>
                    <DateInput
                        selectedRange={duplicationRage}
                        setSelectedRange={setDuplicationRage}
                    />
                </div>
                <div className="flex flex-col items-start gap-y-[10px]">
                    <Typography variant="text_14_m">Диапозон Вставки</Typography>
                    <DateInput selectedRange={insertionRage} setSelectedRange={setInsertionRage} />
                </div>
            </div>
            {helperText && (
                <Typography variant="text_14_m" className="text-error-red">
                    {helperText}
                </Typography>
            )}
            <Button variant="primary" className="self-end mt-auto" onClick={() => onSubmit()}>
                Создать
            </Button>
        </div>
    );
};
