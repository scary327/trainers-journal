import * as styles from "./calendar.module.css";
import { format } from "date-fns";

interface SmallCalendarProps {
    selectedRange: { start: Date | null; end: Date | null };
    onDateClick: (date: Date) => void;
}

export const SmallCalendar = ({ selectedRange, onDateClick }: SmallCalendarProps) => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    return (
        <div className={styles.calendar}>
            <div className={styles.calendarHeader}>{format(today, "LLLL yyyy")}</div>
            <div className={styles.calendarGrid}>
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
                    const isSelected =
                        (selectedRange.start &&
                            format(date, "yyyy-MM-dd") ===
                                format(selectedRange.start, "yyyy-MM-dd")) ||
                        (selectedRange.end &&
                            format(date, "yyyy-MM-dd") === format(selectedRange.end, "yyyy-MM-dd"));
                    const isInRange =
                        selectedRange.start &&
                        selectedRange.end &&
                        date > (selectedRange.start as Date) &&
                        date < (selectedRange.end as Date);

                    return (
                        <button
                            key={i}
                            className={`${styles.calendarDay} ${isSelected ? styles.selected : ""} ${
                                isInRange ? styles.inRange : ""
                            }`}
                            onClick={() => onDateClick(date)}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
