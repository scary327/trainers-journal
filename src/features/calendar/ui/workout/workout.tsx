import { Typography } from "@/shared/ui";
import * as styles from "./workout.module.css";
import { classnames } from "@/shared/lib";
import { IClass } from "@/shared/types";
import { getNormalTime } from "../body/CalendarBody";

export const getClasses = (start: string, end: string) => {
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

interface IWorkoutProps {
    workout: IClass;
    onClick: () => void;
}

export const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
    });
};

export const Workout = ({ workout, onClick }: IWorkoutProps): JSX.Element => {
    const startTime = formatTime(getNormalTime(workout.date, workout.timeStart));
    const endTime = formatTime(getNormalTime(workout.date, workout.timeEnd));

    const workoutClass = getClasses(
        getNormalTime(workout.date, workout.timeStart),
        getNormalTime(workout.date, workout.timeEnd)
    );

    return (
        <div onClick={onClick} className={classnames(styles.container, workoutClass)}>
            <div className={classnames(styles.workout_header, workoutClass)}>
                <Typography variant="text_10_m" tag="p">
                    {`${startTime} - ${endTime}`}
                </Typography>
            </div>
            <Typography className="pl-[4px]" variant="text_12_r">
                Группа: {workout.groupName}
            </Typography>
            <Typography className="pl-[4px]" variant="text_10_r">
                Тренер: {workout.trainerLastName} {workout.trainerFirstName[0]}.
            </Typography>
        </div>
    );
};
