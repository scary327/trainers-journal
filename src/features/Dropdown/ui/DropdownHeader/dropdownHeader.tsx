import { IStudentHeader } from "@/shared/types";
import { Typography } from "@/shared/ui";

// import * as styles from "./dropdownHeader.module.css";

interface DropdownHeaderProps {
    student: IStudentHeader;
    onPayment: () => void;
    onEdit: () => void;
}

export const DropdownHeader = ({ student, onPayment, onEdit }: DropdownHeaderProps) => {
    return (
        <>
            <Typography tag="span" variant="text_14_m">
                {student.fullName}
            </Typography>
            <Typography tag="span" variant="text_14_m">
                {student.group}
            </Typography>
            <Typography tag="span" variant="text_14_m">
                {student.balance} ₽
            </Typography>
            <Typography tag="span" variant="text_14_m">
                {student.kyu}
            </Typography>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPayment();
                }}
                className="py-[10px]"
            >
                <Typography variant="text_14_b" className=" underline">
                    История платежей
                </Typography>
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                }}
                className="py-[10px]"
            >
                <Typography variant="text_14_b" className="underline">
                    Редактировать
                </Typography>
            </button>
        </>
    );
};
