import { Calendar } from "@/features/calendar/";
import * as styles from "./calendarPage.module.css";
import { PageTitle } from "@/shared/ui";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import { getGroups, getPractices } from "@/entities/api/services";

export const CalendarPage = () => {
    const title = "Календарь";

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    useEffect(() => {
        dispatch(getPractices(user));
        dispatch(getGroups(user.userName));
    }, []);

    return (
        <div className={styles.container}>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <Calendar />
            </div>
        </div>
    );
};
