import { useRef, useState } from "react";
import * as styles from "./dateInput.module.css";
import { classnames, useOnClickOutside } from "@/shared/lib";
import { Typography } from "../../Typography/typography";
import { format } from "date-fns";
import { SmallCalendar } from "./calendar/calendar";
import { DateRange } from "@/shared/types";

interface DateInputProps {
    label?: string;
    className?: string;
    onlyOneDate?: boolean;
    selectedRange: DateRange;
    setSelectedRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

export const DateInput = (props: DateInputProps) => {
    const { selectedRange, setSelectedRange } = { ...props };
    const [open, setOpen] = useState<boolean>(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(calendarRef, () => setOpen(false));

    const handleDateClick = (date: Date) => {
        if (
            !selectedRange.start ||
            props.onlyOneDate ||
            (selectedRange.start && selectedRange.end)
        ) {
            setSelectedRange({ start: date, end: null });
        } else {
            setSelectedRange((prev) => ({
                start: prev.start,
                end: date < (prev.start as Date) ? prev.start : date
            }));
        }
    };

    const formattedDate = selectedRange.start
        ? `${format(selectedRange.start, "dd.MM.yyyy")}${selectedRange.end ? ` - ${format(selectedRange.end, "dd.MM.yyyy")}` : ""}`
        : "";

    return (
        <div className="min-w-[200px] max-w-[300px]" ref={calendarRef}>
            <button
                className={classnames(
                    styles.container,
                    props.className,
                    open ? styles.container_open : ""
                )}
                onClick={() => setOpen(true)}
            >
                <div className={styles.input}>
                    <Typography variant="text_14_b">
                        {formattedDate || props.label || "Выбрать дату"}
                    </Typography>
                </div>
            </button>
            <div className="relative">
                {open && (
                    <div className={styles.calendarWrapper}>
                        <SmallCalendar
                            selectedRange={selectedRange}
                            onDateClick={handleDateClick}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
