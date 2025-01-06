import { useState } from "react";
import * as styles from "./calendar.module.css";
import { addMonths, format, setYear, subMonths, startOfMonth, getDay } from "date-fns";
import { ru } from "date-fns/locale";
import ArrowSVG from "@/shared/icons/arrowDown.svg";
import { Typography } from "@/shared/ui/Typography/typography";
import { classnames } from "@/shared/lib";

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

    const startDayOfMonth = (getDay(startOfMonth(currentMonth)) + 6) % 7; // День недели начала месяца (0 - Воскресенье, 6 - Суббота)

    const handlePreviousMonth = () => {
        setCurrentMonth((prev) => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1));
    };

    const toggleYearSelector = () => {
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

    // Генерация дней месяца по неделям
    const days = Array.from({ length: 42 }, (_, i) => {
        const dayIndex = i - startDayOfMonth + 1; // Сдвиг для начала месяца
        return dayIndex > 0 && dayIndex <= daysInMonth
            ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayIndex)
            : null; // null для пустых ячеек
    });

    return (
        <div className={styles.calendar}>
            <div className={styles.calendar_header}>
                <button type="button" onClick={toggleYearSelector}>
                    <Typography variant="text_14_b">
                        {format(currentMonth, "LLLL yyyy", { locale: ru })}
                    </Typography>
                </button>

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
                <div className={classnames(styles.year_selector, "scrollbar-webkit")}>
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
            <div className={styles.weekdays}>
                {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                    <div key={day} className={styles.weekday}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={styles.calendar_grid}>
                {days.map((date, i) => {
                    const isSelected =
                        date &&
                        ((selectedRange.start &&
                            format(date, "yyyy-MM-dd") ===
                                format(selectedRange.start, "yyyy-MM-dd")) ||
                            (selectedRange.end &&
                                format(date, "yyyy-MM-dd") ===
                                    format(selectedRange.end, "yyyy-MM-dd")));
                    const isInRange =
                        date &&
                        selectedRange.start &&
                        selectedRange.end &&
                        date > (selectedRange.start as Date) &&
                        date < (selectedRange.end as Date);

                    return (
                        <button
                            type="button"
                            key={i}
                            className={classnames(
                                styles.calendar_day,
                                isSelected ? styles.selected : "",
                                isInRange ? styles.in_range : "",
                                !date ? styles.empty_day : ""
                            )}
                            onClick={() => date && onDateClick(date)}
                            disabled={!date}
                        >
                            {date ? date.getDate() : ""}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
