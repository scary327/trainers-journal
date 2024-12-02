import { Typography } from "@/shared/ui";
import * as styles from "./workout.module.css";
import { IClass } from "../../types";

interface IWorkoutProps {
    workout: IClass;
}

export const Workout = ({ workout }: IWorkoutProps) => {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    const startTime = formatTime(workout.start);
    const endTime = formatTime(workout.end);
    return (
        <div className={styles.container}>
            <div className={styles.workout_header}>
                <Typography variant="text_10_m" tag="p">
                    {`${startTime} - ${endTime}`}
                </Typography>
            </div>
            <Typography variant="text_12_r">Группа: {workout.group}</Typography>
            <Typography variant="text_10_r">Тренер: {workout.teacher}</Typography>
        </div>
    );
};
