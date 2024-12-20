import { DateRange } from "@/shared/types";
import { Button, DateInput, Typography } from "@/shared/ui";
import { useState } from "react";

export const ScheduleDuplication = () => {
    const [insertionRage, setInsertionRage] = useState<DateRange>({
        start: null,
        end: null
    });

    const [duplicationRage, setDuplicationRage] = useState<DateRange>({
        start: null,
        end: null
    });

    const onSubmit = () => {
        console.log(insertionRage, duplicationRage);
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
            <Button variant="primary" className="self-end mt-auto" onClick={() => onSubmit()}>
                Создать
            </Button>
        </div>
    );
};
