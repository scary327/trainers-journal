import { Button, Typography } from "@/shared/ui";
import * as styles from "./dropdownContent.module.css";
import { Item } from "./item/item";
import { IStudent } from "@/widgets";

interface DropdownContentProps {
    studentDetails: IStudent;
    openContacts: () => void;
}

export const DropdownContent = ({ studentDetails, openContacts }: DropdownContentProps) => {
    const studentDetailsInfo = {
        gender: "Пол",
        birthDate: "Дата рождения",
        class: "Класс",
        address: "Адрес",
        mother: "Мама",
        father: "Папа"
    };

    const studentGender = () => {
        switch (studentDetails.studentInfoItemDto.gender) {
            case 1:
                return "Мужской";
            case 0:
                return "Женский";
            default:
                return "Не указано";
        }
    };

    return (
        <>
            <div className={styles.content}>
                <div className={styles.row_content}>
                    <Item item_name={studentDetailsInfo.gender} item_value={studentGender()} />
                    <Item
                        item_name={studentDetailsInfo.birthDate}
                        item_value={studentDetails.studentInfoItemDto.dateOfBirth ?? "не указано"}
                    />
                    <div className="flex flex-col items-start gap-y-[5px] max-w-[250px]">
                        <Typography variant="text_14_r" className="text-gray-text">
                            Контакты
                        </Typography>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                openContacts();
                            }}
                            variant="empty"
                            className="p-0 text-black font-inter-bold"
                        >
                            Посмотреть контакты
                        </Button>
                    </div>
                </div>
                <div className={styles.row_content}>
                    <Item
                        item_name={studentDetailsInfo.class}
                        item_value={`${studentDetails.studentInfoItemDto.class} класс`}
                    />
                    <Item
                        item_name={studentDetailsInfo.address}
                        item_value={studentDetails.studentInfoItemDto.address ?? "не указано"}
                    />
                </div>
            </div>
        </>
    );
};
