import { IStudentDetails } from "@/shared/types";
import * as styles from "./dropdownContent.module.css";
import { Item } from "./item/item";

interface DropdownContentProps {
    studentDetails: IStudentDetails;
}

export const DropdownContent = ({ studentDetails }: DropdownContentProps) => {
    const studentDetailsInfo = {
        gender: "Пол",
        birthDate: "Дата рождения",
        school: "Школа",
        address: "Адрес",
        mother: "Мама",
        father: "Папа"
    };

    return (
        <div className={styles.content}>
            <div className={styles.row_content}>
                <Item
                    item_name={studentDetailsInfo.gender}
                    item_value={studentDetails.gender ?? "не указано"}
                />
                <Item
                    item_name={studentDetailsInfo.birthDate}
                    item_value={studentDetails.birthDate ?? "не указано"}
                />
                <Item
                    item_name={studentDetailsInfo.mother}
                    item_value={studentDetails.mother ?? "не указано"}
                />
            </div>
            <div className={styles.row_content}>
                <Item
                    item_name={studentDetailsInfo.school}
                    item_value={studentDetails.school ?? "не указано"}
                />
                <Item
                    item_name={studentDetailsInfo.address}
                    item_value={studentDetails.address ?? "не указано"}
                />
                <Item
                    item_name={studentDetailsInfo.father}
                    item_value={studentDetails.father ?? "не указано"}
                />
            </div>
        </div>
    );
};
