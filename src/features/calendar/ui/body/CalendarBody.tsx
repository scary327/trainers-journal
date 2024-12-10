import { useSelector } from "react-redux";
import * as styles from "./CalendarBody.module.css";
import { selectCurrentWeek } from "../../model/calendar.slice";
import { formatWeekDays } from "../../utils";
import { Typography } from "@/shared/ui";
import { classnames } from "@/shared/lib";
import { IClassTime, IClass } from "../../types";
import { Workout } from "../workout/workout";

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
        let startTime = new Date();
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
            start: "2024-12-09T11:30:00",
            end: "2024-12-09T12:30:00",
            group: "Йога",
            teacher: "Иван Иванов",
            students: []
        }
    ];

    //функция для проверки, попадает ли тренировка в заданный день и время
    const getClassForCell = (day: Date, time: IClassTime) => {
        const filteredClasses = classList.filter((cls) => {
            const startDate = new Date(cls.start);
            const isSameDay = startDate.toDateString() === day.toDateString();
            const isSameTime = startDate.toTimeString().slice(0, 5) === time.start;
            return isSameDay && isSameTime;
        });
        return filteredClasses;
    };

    return (
        <div className={styles.container}>
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
                                        classesForCell.map((cls, clsIndex) => (
                                            <Workout workout={cls} key={clsIndex} />
                                        ))
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
