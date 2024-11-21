import { useSelector } from "react-redux";
import * as styles from "./CalendarBody.module.css";
import { selectCurrentWeek } from "../../model/calendar.slice";
import { formatWeekDays } from "../../utils";
import { Typography } from "@/shared/ui";
import { classnames } from "@/shared/lib";

interface BodyHeaderProps {
    formatedWeek: string[];
}

interface IClassTime {
    name: string;
    timeStart: string;
    timeEnd: string;
}

interface IStudentClass {
    fullName: string;
    kyu: number;
    status: boolean;
}

interface IClass {
    name: string;
    date: string;
    students: IStudentClass[];
}

const BodyHeader = ({ formatedWeek }: BodyHeaderProps) => {
    return (
        <div className={classnames(styles.table_grid, styles.table_header)}>
            <div />
            {formatedWeek.map((day, index) => (
                <Typography className={styles.table_item} variant="text_14_r" key={index}>
                    {day}
                </Typography>
            ))}
        </div>
    );
};

export const CalendarBody = () => {
    const currentWeek = useSelector(selectCurrentWeek).map((date) => new Date(date));
    const formatedWeek = formatWeekDays(currentWeek);

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

    const classList: IClass[] = [];

    return (
        <div className={styles.container}>
            <BodyHeader formatedWeek={formatedWeek} />
            <div className={styles.table_content}>
                {classTime.map((item, index) => (
                    <div className={styles.table_grid} key={index}>
                        <div>
                            <Typography variant="text_12_r">{item.name}</Typography>
                            <Typography variant="text_12_r">{item.timeStart}</Typography>
                            <Typography variant="text_12_r">{item.timeEnd}</Typography>
                        </div>
                        {Array.from({ length: formatedWeek.length }).map((_, index) => (
                            <div className={styles.table_item} key={index}>
                                <Typography variant="text_12_r">--</Typography>
                            </div>
                        ))}
                    </div>
                ))}
                <div className={styles.table_last_grid} />
            </div>
        </div>
    );
};
