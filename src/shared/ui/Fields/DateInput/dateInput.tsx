import { useRef, useState } from "react";
import * as styles from "./dateInput.module.css";
import { classnames, useOnClickOutside } from "@/shared/lib";
import { Typography } from "../../Typography/typography";
import { format } from "date-fns";
import { SmallCalendar } from "./calendar/calendar";

interface DateInputProps {
    label?: string;
    isError?: boolean;
    helperText?: string;
    className?: string;
}

export const DateInput = (props: DateInputProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({
        start: null,
        end: null
    });
    const calendarRef = useRef<HTMLDivElement>(null);

    // Close calendar on outside click
    useOnClickOutside(calendarRef, () => setOpen(false));

    const handleDateClick = (date: Date) => {
        if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
            setSelectedRange({ start: date, end: null }); // Start new range
        } else {
            setSelectedRange((prev) => ({
                start: prev.start,
                end: date < (prev.start as Date) ? prev.start : date // Handle reversed range
            }));
            setOpen(false); // Close calendar after completing range
        }
    };

    const formattedDate = selectedRange.start
        ? `${format(selectedRange.start, "dd.MM.yyyy")}${selectedRange.end ? ` - ${format(selectedRange.end, "dd.MM.yyyy")}` : ""}`
        : "";

    return (
        <div className={classnames(styles.container, props.className)} ref={calendarRef}>
            <button className={styles.input} onClick={() => setOpen(true)}>
                <Typography variant="text_14_b">
                    {formattedDate || props.label || "Выбрать дату"}
                </Typography>
            </button>
            {open && (
                <div className={styles.calendarWrapper}>
                    <SmallCalendar selectedRange={selectedRange} onDateClick={handleDateClick} />
                </div>
            )}
        </div>
    );
};
