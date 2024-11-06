import { Typography } from "@/shared/ui";
import { IStudentHeader } from "../../types/types";

interface DropdownHeaderProps {
    student: IStudentHeader;
}

export const DropdownHeader = ({ student }: DropdownHeaderProps) => {
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
            <Typography tag="span" variant="text_14_m">
                История платежей
            </Typography>
        </>
    );
};
