import { IStudentDetails, IStudentHeader } from "@/features/Dropdown/types/types";
import * as styles from "./usersTable.module.css";
import { Button, Search, Typography } from "@/shared/ui";

import FilterSVG from "@/shared/icons/filter.svg";
import { useEffect, useState } from "react";
import { Dropdown, DropdownContent, DropdownHeader } from "@/features";

interface IStudents {
    studentInfo: IStudentHeader;
    studentDetails: IStudentDetails;
}

export const UsersTable = () => {
    const tableItems: string[] = ["ФИО", "Группа", "Баланс", "КЮ", ""];

    const [loading, setLoading] = useState<boolean>(false);
    const [students, setStudents] = useState<IStudents[]>([]);

    const studentInfo: IStudentHeader = {
        fullName: "Смирнов Алексей Александрович",
        group: "Разработка",
        balance: "300.56",
        kyu: 6
    };

    const studentDetails: IStudentDetails = {
        gender: "Мужской",
        birthDate: "26.10.2008 (16 лет)",
        school: "МАОУ СОШ №44",
        address: "ул. Ленина, д. 20, кв. 15",
        mother: "Смирнова Мария Александровна +79006007780",
        father: "Смирнов Алексей Александрович +79006007780"
    };

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            setTimeout(() => {
                setStudents([{ studentInfo, studentDetails }]);
                setLoading(false);
            }, 1000);
        };

        fetchStudents();
    }, []);

    const tableBody = loading ? (
        <div className=" flex flex-col gap-y-[20px]">
            {Array.from({ length: 3 }).map((_, index) => (
                <div className="skeleton w-full h-[45px] rounded-[10px]" key={index} />
            ))}
        </div>
    ) : (
        students.map((student, index) => (
            <Dropdown
                key={index}
                header={<DropdownHeader key={index} student={student.studentInfo} />}
                content={<DropdownContent key={index} studentDetails={student.studentDetails} />}
            />
        ))
    );

    return (
        <div className={styles.container}>
            <div className={styles.filter_container}>
                <Search />
                <Button variant="primary" className="flex items-center gap-x-[10px]">
                    Фильтры <FilterSVG className="w-[20px] h-[20px]" />
                </Button>
                <Button variant="primary" className="whitespace-nowrap">
                    Добавить пользователя
                </Button>
            </div>
            <div className={styles.table_container}>
                <div className={styles.table_header}>
                    {tableItems.map((item, index) => (
                        <Typography
                            variant="text_14_r"
                            key={index}
                            className="text-gray-text whitespace-nowrap"
                        >
                            {item}
                        </Typography>
                    ))}
                </div>
                <div className={styles.table_body}>{tableBody}</div>
            </div>
        </div>
    );
};
