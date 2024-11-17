import { Calendar } from "@/features/calendar/";
import * as styles from "./calendarPage.module.css";
import { PageTitle } from "@/shared/ui";

export const CalendarPage = () => {
    const title = "Календарь";

    return (
        <div className={styles.container}>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <Calendar />
            </div>
        </div>
    );
};
