import { Typography } from "@/shared/ui";
import * as styles from "./workout.module.css";
import { IClass } from "../../types";
import { classnames } from "@/shared/lib";

interface IWorkoutProps {
    workout: IClass;
}

/**
 * Workout component. Displays a workout with its name, teacher, group, start and end time.
 *
 * @param {IClass} workout - The workout to display.
 * @returns {JSX.Element} The component.
 */
export const Workout = ({ workout }: IWorkoutProps): JSX.Element => {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    const startTime = formatTime(workout.start);
    const endTime = formatTime(workout.end);

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

    const workoutClass = getClasses(workout.start, workout.end);

    return (
        <div className={classnames(styles.container, workoutClass)}>
            <div className={classnames(styles.workout_header, workoutClass)}>
                <Typography variant="text_10_m" tag="p">
                    {`${startTime} - ${endTime}`}
                </Typography>
            </div>
            <Typography className="pl-[4px]" variant="text_12_r">
                Группа: {workout.group}
            </Typography>
            <Typography className="pl-[4px]" variant="text_10_r">
                Тренер: {workout.teacher}
            </Typography>
        </div>
    );
};
