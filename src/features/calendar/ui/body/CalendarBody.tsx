import { useSelector } from "react-redux";
import * as styles from "./CalendarBody.module.css";
import { selectCurrentWeek } from "../../model/calendar.slice";
import { formatWeekDays } from "../../utils";
import { Typography } from "@/shared/ui";
import { classnames } from "@/shared/lib";
import { IClass } from "@/shared/types";
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
}

export const CalendarBody = ({ onOpenWorkout }: ICalendarBodyProps) => {
    const currentWeek = useSelector(selectCurrentWeek).map((date) => new Date(date));
    const formattedWeek = formatWeekDays(currentWeek);
    const workoutList: IClass[] = useSelector((state: RootState) => state.practices.practices);

    const hours = Array.from({ length: 18 }, (_, i) => `${i + 6}:00`);

    const getWorkoutStyle = (workout: IClass) => {
        const startHour = parseInt(workout.timeStart.split(":")[0], 10);
        const startMinutes = parseInt(workout.timeStart.split(":")[1], 10);
        const endHour = parseInt(workout.timeEnd.split(":")[0], 10);
        const endMinutes = parseInt(workout.timeEnd.split(":")[1], 10);

        const dayStartOffset = 6 * 60;
        const startTime = startHour * 60 + startMinutes - dayStartOffset;
        const endTime = endHour * 60 + endMinutes - dayStartOffset;

        const totalMinutes = 18 * 60;
        const top = (startTime / totalMinutes) * 100;
        const height = ((endTime - startTime) / totalMinutes) * 100;

        return {
            top: `${top}%`,
            height: `${height}%`
        };
    };

    const getWorkoutState = (workout: IClass) => {
        const now = new Date();
        const startDate = new Date(getNormalTime(workout.date, workout.timeStart));
        const endDate = new Date(getNormalTime(workout.date, workout.timeEnd));

        if (now > endDate) {
            return "past";
        } else if (now >= startDate && now <= endDate) {
            return "current";
        }
        return "upcoming";
    };

    const handleWorkoutClick = () => () => {
        onOpenWorkout();
    };

    const todayISO = new Date().toLocaleDateString("en-CA");

    return (
        <div className={classnames(styles.container, "scrollbar-webkit")}>
            <BodyHeader formattedWeek={formattedWeek} />
            <div className={styles.body}>
                <div className={styles.timeColumn}>
                    {hours.map((hour) => (
                        <div key={hour} className={styles.timeRow}>
                            <Typography variant="text_12_r">{hour}</Typography>
                        </div>
                    ))}
                </div>
                {formattedWeek.map((day, dayIndex) => {
                    const dayISO = currentWeek[dayIndex].toLocaleDateString("en-CA");
                    const isToday = dayISO === todayISO;

                    return (
                        <div
                            key={dayIndex}
                            className={classnames(styles.dayColumn, {
                                [styles.currentDay]: isToday
                            })}
                        >
                            {workoutList
                                .filter((workout) => workout.date === dayISO)
                                .map((workout) => {
                                    const workoutState = getWorkoutState(workout);
                                    const trainerFullName = `${workout.trainerLastName} ${workout.trainerFirstName[0]}.${workout.trainerMiddleName[0]}.`;

                                    return (
                                        <div
                                            key={workout.practiceId}
                                            className={classnames(
                                                styles.workout,
                                                styles[workoutState]
                                            )}
                                            style={getWorkoutStyle(workout)}
                                            onClick={handleWorkoutClick()}
                                        >
                                            <div className="content">
                                                <div className="time">
                                                    {workout.timeStart.slice(0, 5)} -{" "}
                                                    {workout.timeEnd.slice(0, 5)}
                                                </div>

                                                <Typography
                                                    variant="text_14_m"
                                                    className="groupName"
                                                >
                                                    {workout.groupName}
                                                </Typography>

                                                <Typography variant="text_12_r" className="text">
                                                    {trainerFullName}
                                                </Typography>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
