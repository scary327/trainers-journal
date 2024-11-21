import { CalendarBody } from "./body/CalendarBody";
import { CalendarHeader } from "./header/CalendarHeader";

export const Calendar = () => {
    return (
        <div className="w-[65vw]">
            <CalendarHeader />
            <CalendarBody />
        </div>
    );
};
