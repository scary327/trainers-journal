import { Button, Typography } from "@/shared/ui";
import ArrowSVG from "@/shared/icons/arrowDown.svg";
import CalendarSVG from "@/shared/icons/calendar.svg";

import * as styles from "./CalendarHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nextWeek, prevWeek, selectCurrentWeek } from "../../model/calendar.slice";
import { formatWeekRangeIntl } from "../../utils";
import { RootState } from "@/app/store";

export const CalendarHeader = () => {
    const currentWeek = useSelector(selectCurrentWeek).map((date) => new Date(date));
    const weekHeaderStr = formatWeekRangeIntl(currentWeek);
    const userRole = useSelector((state: RootState) => state.user.user.role);

    const dispatch = useDispatch();

    const handleNextWeek = () => {
        dispatch(nextWeek());
    };

    const handlePrevWeek = () => {
        dispatch(prevWeek());
    };

    return (
        <div className={styles.container}>
            <div className="flex gap-x-[30px]">
                <div className="flex items-center gap-x-[10px]">
                    <Button variant="primary" className="border-white" onClick={handlePrevWeek}>
                        <ArrowSVG className="rotate-90 w-[20px] h-[10px]" />
                    </Button>
                    <Button variant="primary" className="border-white" onClick={handleNextWeek}>
                        <ArrowSVG className="-rotate-90 w-[20px] h-[10px]" />
                    </Button>
                </div>
                <div className="flex items-center gap-x-[10px]">
                    <CalendarSVG className="text-white w-[20px] h-[20px]" />
                    <Typography variant="text_16_r" className="text-white">
                        {weekHeaderStr}
                    </Typography>
                </div>
            </div>
            {userRole === "trainer" && (
                <div className="flex gap-x-[30px]">
                    <Button variant="primary" className="border-white">
                        Дублировать расписание
                    </Button>
                    <Button variant="primary" className="border-white">
                        Добавить тренировку
                    </Button>
                </div>
            )}
        </div>
    );
};
