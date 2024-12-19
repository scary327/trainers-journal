import { Typography } from "@/shared/ui";
import { IStudent } from "@/widgets";

// import * as styles from "./dropdownHeader.module.css";

interface DropdownHeaderProps {
    student: IStudent;
    onPayment: () => void;
    onEdit: () => void;
}

export const DropdownHeader = ({ student, onPayment, onEdit }: DropdownHeaderProps) => {
    return (
        <>
            <Typography tag="span" variant="text_14_m">
                {student.studentInfoItemDto.lastName} {student.studentInfoItemDto.firstName[0]}.
            </Typography>
            <Typography tag="span" variant="text_14_m">
                {student.studentInfoItemDto.groups?.map((group) => group.groupName).join(" ")}
            </Typography>
            <Typography tag="span" variant="text_14_m">
                баланс не известен
            </Typography>
            <Typography tag="span" variant="text_14_m">
                {student.studentInfoItemDto.kyu}
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
