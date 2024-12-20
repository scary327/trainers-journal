import { useState } from "react";
import { CalendarBody } from "./body/CalendarBody";
import { CalendarHeader } from "./header/CalendarHeader";
import { Modal, SlideOutMenu } from "@/shared/ui";
import { IClass } from "@/shared/types";
import { ModalWorkoutContent } from "./modal-workout-content/modalWorkoutContent";
import { EditPracticeContent } from "./editPracticeContent/editPracticeContent";
import { ScheduleDuplication } from "./scheduleDuplication/scheduleDuplication";

export const Calendar = () => {
    const [openWorkout, setOpenWorkout] = useState<boolean>(false);
    const [currentWorkout, setCurrentWorkout] = useState<IClass>({} as IClass);

    const [slideOutOpen, setSlideOutOpen] = useState<boolean>(false);

    const [openDuplicate, setOpenDuplicate] = useState<boolean>(false);

    return (
        <>
            <div className="w-[65vw]">
                <CalendarHeader
                    openDuplicate={() => setOpenDuplicate(true)}
                    setSlideOutOpen={() => setSlideOutOpen(true)}
                />
                <CalendarBody
                    onOpenWorkout={() => setOpenWorkout(true)}
                    setCurrentWorkout={(workout: IClass) => setCurrentWorkout(workout)}
                />
            </div>
            <Modal visible={openDuplicate} onClose={() => setOpenDuplicate(false)}>
                <ScheduleDuplication />
            </Modal>
            <Modal visible={openWorkout} onClose={() => setOpenWorkout(false)}>
                <ModalWorkoutContent
                    workout={currentWorkout}
                    onClose={() => setOpenWorkout(false)}
                />
            </Modal>
            <SlideOutMenu isOpen={slideOutOpen} onClose={() => setSlideOutOpen(false)}>
                <EditPracticeContent />
            </SlideOutMenu>
        </>
    );
};
