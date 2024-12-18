import { useSelector } from "react-redux";
import * as styles from "./CalendarBody.module.css";
import { selectCurrentWeek } from "../../model/calendar.slice";
import { formatWeekDays } from "../../utils";
import { Typography } from "@/shared/ui";
import { classnames } from "@/shared/lib";
import { Workout } from "../workout/workout";
import { IClassTime, IClass } from "@/shared/types";

interface BodyHeaderProps {
    formattedWeek: string[];
}

const BodyHeader = ({ formattedWeek }: BodyHeaderProps) => {
    return (
        <div className={classnames(styles.table_grid, styles.table_header)}>
            <div />
            {formattedWeek.map((day, index) => (
                <Typography className={styles.table_item} variant="text_14_r" key={index}>
                    {day}
                </Typography>
            ))}
        </div>
    );
};

export const CalendarBody = () => {
    const currentWeek = useSelector(selectCurrentWeek).map((date) => new Date(date));
    const formattedWeek = formatWeekDays(currentWeek);

    const generateClassTime = (): IClassTime[] => {
        const times: IClassTime[] = [];
        const startTime = new Date();
        startTime.setHours(6, 0, 0, 0); // Начало в 6:00
        const endTime = new Date();
        endTime.setHours(23, 0, 0, 0); // Конец в 23:00

        while (startTime <= endTime) {
            const timeStart = startTime.toTimeString().slice(0, 5);
            startTime.setMinutes(startTime.getMinutes() + 30); // Добавляем 30 минут

            times.push({
                start: timeStart
            });
        }
        return times;
    };

    const classTime: IClassTime[] = generateClassTime();

    const classList: IClass[] = [
        {
            start: "2024-12-19T17:00:00",
            end: "2024-12-19T18:30:00",
            group: "Йога",
            teacher: "Иван Иванов",
            students: []
        }
    ];

    //функция для проверки, попадает ли тренировка в заданный день и время
    const getClassForCell = (day: Date, time: IClassTime) => {
        const filteredClasses = classList.filter((cls) => {
            const startDate = new Date(cls.start);
            const endDate = new Date(cls.end);

            const isSameDay = startDate.toDateString() === day.toDateString();
            const isWithinTimeRange =
                startDate.toTimeString().slice(0, 5) <= time.start &&
                endDate.toTimeString().slice(0, 5) >= time.start; // Интервал входит в диапазон времени тренировки

            return isSameDay && isWithinTimeRange;
        });

        return filteredClasses;
    };

    const getClasses = (start: string, end: string) => {
        const now = new Date();
        const startTime = new Date(start);
        const endTime = new Date(end);

        if (now > endTime) {
            return styles.past;
        }
        if (now >= startTime && now <= endTime) {
            return styles.current;
        }
        return styles.upcoming;
    };

    return (
        <div className={classnames(styles.container, "scrollbar-webkit")}>
            <BodyHeader formattedWeek={formattedWeek} />
            <div className={styles.table_content}>
                {classTime.map((time, index) => (
                    <div className={styles.table_grid} key={index}>
                        <div>
                            <Typography variant="text_12_r">{time.start}</Typography>
                        </div>
                        {currentWeek.map((day, dayIndex) => {
                            const classesForCell = getClassForCell(day, time);
                            return (
                                <div
                                    className={classnames(
                                        styles.table_item,
                                        classesForCell.length > 0 ? styles.has_item : ""
                                    )}
                                    key={dayIndex}
                                >
                                    {classesForCell.length > 0 ? (
                                        classesForCell.map((cls, clsIndex) =>
                                            time.start ===
                                            new Date(cls.start).toTimeString().slice(0, 5) ? (
                                                <Workout workout={cls} key={clsIndex} />
                                            ) : (
                                                <div
                                                    key={clsIndex}
                                                    className={classnames(
                                                        styles.ongoing,
                                                        getClasses(cls.start, cls.end)
                                                    )}
                                                >
                                                    <Typography variant="text_14_m">
                                                        Идет тренировка
                                                    </Typography>
                                                    <span className={styles.arrow_up}>↑</span>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <Typography variant="text_12_r">--</Typography>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
                <div className={styles.table_last_grid} />
            </div>
        </div>
    );
};
