import { useState } from "react";
import * as styles from "./calendar.module.css";
import { addMonths, format, setYear, subMonths } from "date-fns";
import { ru } from "date-fns/locale";
import ArrowSVG from "@/shared/icons/arrowDown.svg";
import { Typography } from "@/shared/ui/Typography/typography";

interface SmallCalendarProps {
    selectedRange: { start: Date | null; end: Date | null };
    onDateClick: (date: Date) => void;
}

export const SmallCalendar = ({ selectedRange, onDateClick }: SmallCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [isYearSelectorOpen, setYearSelectorOpen] = useState<boolean>(false);
    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    const handlePreviousMonth = () => {
        setCurrentMonth((prev) => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1));
    };

    const toggleYearSelector = () => {
        console.log(123);
        setYearSelectorOpen((prev) => !prev);
    };

    const handleYearClick = (year: number) => {
        setCurrentMonth((prev) => setYear(prev, year));
        setYearSelectorOpen(false);
    };

    const availableYears = Array.from(
        { length: 106 },
        (_, i) => new Date().getFullYear() - 100 + i
    );

    return (
        <div className={styles.calendar}>
            <div className={styles.calendar_header}>
                <Typography onClick={toggleYearSelector} variant="text_14_b">
                    {format(currentMonth, "LLLL yyyy", { locale: ru })}
                </Typography>
                <div className={styles.button_container}>
                    <button
                        type="button"
                        className="hover:text-blue-medium"
                        onClick={handlePreviousMonth}
                    >
                        <ArrowSVG className="rotate-180 w-[24px]" />
                    </button>
                    <button
                        type="button"
                        className="hover:text-blue-medium"
                        onClick={handleNextMonth}
                    >
                        <ArrowSVG className="w-[24px]" />
                    </button>
                </div>
            </div>
            {isYearSelectorOpen && (
                <div className={styles.year_selector}>
                    {availableYears.map((year) => (
                        <button
                            type="button"
                            key={year}
                            className={styles.year_button}
                            onClick={() => handleYearClick(year)}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            )}
            <div className={styles.calendar_grid}>
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const date = new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        i + 1
                    );
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
                            type="button"
                            key={i}
                            className={`${styles.calendar_day} ${
                                isSelected ? styles.selected : ""
                            } ${isInRange ? styles.in_range : ""}`}
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
