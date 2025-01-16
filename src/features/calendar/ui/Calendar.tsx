import { useState } from "react";
import { CalendarBody } from "./body/CalendarBody";
import { CalendarHeader } from "./header/CalendarHeader";
import { Modal, SlideOutMenu } from "@/shared/ui";
import { IClass } from "@/shared/types";
import { ModalWorkoutContent } from "./modal-workout-content/modalWorkoutContent";
import { EditPracticeContent } from "./editPracticeContent/editPracticeContent";
import { ScheduleDuplication } from "./scheduleDuplication/scheduleDuplication";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { clearMessages, setCurrentWorkout } from "@/pages/calendarPage/model/calendar.reducer";

export const Calendar = () => {
    const [openWorkout, setOpenWorkout] = useState<boolean>(false);

    const [slideOutOpen, setSlideOutOpen] = useState<boolean>(false);
    const [slideOutContent, setSlideOutContent] = useState<JSX.Element>(<></>);
    const dispatch = useDispatch<AppDispatch>();
    const [openDuplicate, setOpenDuplicate] = useState<boolean>(false);

    return (
        <>
            <div className="w-[65vw]">
                <CalendarHeader
                    openDuplicate={() => setOpenDuplicate(true)}
                    setSlideOutOpen={() => {
                        setSlideOutOpen(true);
                        setSlideOutContent(<EditPracticeContent isEdit={false} />);
                    }}
                />
                <CalendarBody
                    onOpenWorkout={() => setOpenWorkout(true)}
                    setCurrentWorkout={(workout: IClass) => dispatch(setCurrentWorkout(workout))}
                />
            </div>
            <Modal visible={openDuplicate} onClose={() => setOpenDuplicate(false)}>
                <ScheduleDuplication />
            </Modal>
            <Modal visible={openWorkout} onClose={() => setOpenWorkout(false)}>
                <ModalWorkoutContent
                    onClose={() => {
                        setOpenWorkout(false);
                        dispatch(clearMessages());
                    }}
                    setSlideOutOpen={() => {
                        setSlideOutOpen(true);
                        setSlideOutContent(<EditPracticeContent isEdit={true} />);
                    }}
                />
            </Modal>
            <SlideOutMenu
                isOpen={slideOutOpen}
                onClose={() => {
                    setSlideOutContent(<></>);
                    setSlideOutOpen(false);
                    dispatch(clearMessages());
                }}
            >
                {slideOutContent}
            </SlideOutMenu>
        </>
    );
};
