import { PageTitle } from "@/shared/ui";
import * as styles from "./students-calendar.module.css";
import { Calendar } from "@/features/calendar";

export const StudentCalendar = () => {
    const title: string = "Календарь";
    return (
        <div className={styles.container}>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <Calendar />
            </div>
        </div>
    );
};
