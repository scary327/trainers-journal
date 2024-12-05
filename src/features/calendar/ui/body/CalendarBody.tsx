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

    const classTime: IClassTime[] = [
        {
            name: "1 занятие",
            timeStart: "10:00",
            timeEnd: "11:00"
        },
        {
            name: "2 занятие",
            timeStart: "11:30",
            timeEnd: "12:30"
        },
        {
            name: "3 занятие",
            timeStart: "13:00",
            timeEnd: "14:00"
        },
        {
            name: "4 занятие",
            timeStart: "14:30",
            timeEnd: "15:30"
        },
        {
            name: "5 занятие",
            timeStart: "16:00",
            timeEnd: "17:00"
        },
        {
            name: "6 занятие",
            timeStart: "17:30",
            timeEnd: "18:30"
        }
    ];

    const classList: IClass[] = [
        {
            start: "2024-12-03T11:30:00",
            end: "2024-12-03T12:30:00",
            group: "Йога",
            teacher: "Иван Иванов",
            students: []
        },
        {
            start: "2024-12-03T16:00:00",
            end: "2024-12-03T17:00:00",
            group: "Йога2",
            teacher: "Иван Иванов",
            students: []
        },
        {
            start: "2024-12-04T14:30:00",
            end: "2024-12-04T15:30:00",
            group: "Пилатес",
            teacher: "Анна Смирнова",
            students: []
        }
    ];

    //функция для проверки, попадает ли тренировка в заданный день и время
    const getClassForCell = (day: Date, time: IClassTime) => {
        const filteredClasses = classList.filter((cls) => {
            const startDate = new Date(cls.start);
            const isSameDay = startDate.toDateString() === day.toDateString();
            const isSameTime = startDate.toTimeString().slice(0, 5) === time.timeStart;
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
                            <Typography variant="text_12_r">{time.name}</Typography>
                            <Typography variant="text_12_r">{time.timeStart}</Typography>
                            <Typography variant="text_12_r">{time.timeEnd}</Typography>
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
