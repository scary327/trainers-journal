import { useSelector } from "react-redux";
import * as styles from "./CalendarBody.module.css";
import { selectCurrentWeek } from "../../model/calendar.slice";
import { formatWeekDays } from "../../utils";
import { Typography } from "@/shared/ui";
import { classnames } from "@/shared/lib";
import { Workout } from "../workout/workout";
import { IClassTime, IClass } from "@/shared/types";
import { RootState } from "@/app/store";

interface BodyHeaderProps {
    formattedWeek: string[];
}

export const getNormalTime = (date: string, time: string) => `${date}T${time}`;

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

interface ICalendarBodyProps {
    onOpenWorkout: () => void;
    setCurrentWorkout: (workout: IClass) => void;
}

export const CalendarBody = ({ onOpenWorkout, setCurrentWorkout }: ICalendarBodyProps) => {
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

    const workoutList: IClass[] = useSelector((state: RootState) => state.practices.practices);

    //функция для проверки, попадает ли тренировка в заданный день и время
    const getClassForCell = (day: Date, time: IClassTime) => {
        const filteredClasses = workoutList.filter((cls) => {
            const startDate = new Date(getNormalTime(cls.date, cls.timeStart));
            const endDate = new Date(getNormalTime(cls.date, cls.timeEnd));

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

    const handleWorkoutClick = (workout: IClass) => () => {
        setCurrentWorkout(workout);
        onOpenWorkout();
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
                                            new Date(getNormalTime(cls.date, cls.timeStart))
                                                .toTimeString()
                                                .slice(0, 5) ? (
                                                <Workout
                                                    onClick={handleWorkoutClick(cls)}
                                                    workout={cls}
                                                    key={clsIndex}
                                                />
                                            ) : (
                                                <div
                                                    key={clsIndex}
                                                    className={classnames(
                                                        styles.ongoing,
                                                        getClasses(
                                                            getNormalTime(cls.date, cls.timeStart),
                                                            getNormalTime(cls.date, cls.timeEnd)
                                                        )
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
