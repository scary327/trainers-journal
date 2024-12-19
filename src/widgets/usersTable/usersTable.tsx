import * as styles from "./usersTable.module.css";
import { Button, Modal, Search, Typography } from "@/shared/ui";

import FilterSVG from "@/shared/icons/filter.svg";
import { useEffect, useState } from "react";
import { Dropdown, DropdownContent, DropdownHeader, PaymentHistory } from "@/features";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export interface IContact {
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    email: string;
    relation: string;
}

export interface IStudent {
    groupId: string;
    studentInfoItemDto: IStudentInfo;
    contacts?: IContact[];
}
export interface IStudentInfo {
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: string;
    kyu: number;
    class: number;
    address: string;
    phoneNumber: string;
    email: string;
    gender: number;
    walletBalance?: number;
    groupName?: string;
}
// "userName": "string",
// "firstName": "string",
// "lastName": "string",
// "middleName": "string",
// "groupName": "string",
// "walletBalance": 0,
// "kyu": 0
interface IProps {
    openFilter?: () => void;
    openEdit?: (student: IStudent | null) => void;
}

export const UsersTable = ({ openFilter, openEdit }: IProps) => {
    const tableItems: string[] = ["ФИО", "Группа", "Баланс", "КЮ", ""];

    const [loading, setLoading] = useState<boolean>(false);

    // const students: IStudent[] = [
    //     {
    //         groupId: "first group",
    //         studentInfoItemDto: {
    //             firstName: "Алексей",
    //             lastName: "Смирнов",
    //             middleName: "Александрович",
    //             kyu: 6,
    //             class: 1,
    //             address: "ул. Ленина, д. 20, кв. 15",
    //             gender: 1,
    //             phoneNumber: "89006007780",
    //             email: "apapapa@gmail.com",
    //             dateOfBirth: "2024-12-19",
    //             walletBalance: 0,
    //             groupName: "pepegas"
    //         },
    //         contacts: [
    //             {
    //                 firstName: "Алексей",
    //                 lastName: "Смирнов",
    //                 middleName: "Александрович",
    //                 phoneNumber: "89006007781",
    //                 email: "apapapa@gmail.com",
    //                 relation: "Папа"
    //             }
    //         ]
    //     }
    // ];

    const students: IStudent[] = useSelector((state: RootState) => state.students.students);

    const [payment, setPayment] = useState<IStudent | boolean>(false);

    const [contacts, setContacts] = useState<boolean>(false);
    const [currentStudent, setCurrentStudent] = useState<IStudent | null>(null);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            setTimeout(() => {
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
                header={
                    <DropdownHeader
                        onPayment={() => setPayment(student)}
                        onEdit={() => {
                            openEdit?.(student);
                        }}
                        key={index}
                        student={student}
                    />
                }
                content={
                    <DropdownContent
                        openContacts={() => {
                            setCurrentStudent(student);
                            setContacts(true);
                        }}
                        key={index}
                        studentDetails={student}
                    />
                }
            />
        ))
    );

    return (
        <>
            <div className={styles.container}>
                <div className={styles.filter_container}>
                    <Search />
                    <Button
                        variant="primary"
                        className="flex items-center gap-x-[10px]"
                        onClick={openFilter}
                    >
                        Фильтры <FilterSVG className="w-[20px] h-[20px]" />
                    </Button>
                    <Button
                        variant="primary"
                        className="whitespace-nowrap"
                        onClick={() => openEdit?.(null)}
                    >
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
            <Modal visible={!!payment} onClose={() => setPayment(false)}>
                <PaymentHistory />
            </Modal>
            <Modal visible={contacts} onClose={() => setContacts(false)}>
                {currentStudent && (
                    <div className="flex flex-col gap-y-[20px]">
                        <Typography variant="text_18_b" className="text-blue-dark mr-6">
                            Контакты ученика {currentStudent.studentInfoItemDto.lastName}{" "}
                            {currentStudent.studentInfoItemDto.firstName}
                        </Typography>
                        {currentStudent?.contacts?.map((contact) => (
                            <div
                                key={contact.email}
                                className="flex flex-col items-start gap-y-[10px]"
                            >
                                <Typography variant="text_16_b" className="text-gray-text">
                                    {contact.relation}
                                </Typography>
                                <div className="flex gap-x-[10px]">
                                    <Typography variant="text_14_b">{contact.lastName}</Typography>
                                    <Typography variant="text_14_b">{contact.firstName}</Typography>
                                    <Typography variant="text_14_b">
                                        {contact.middleName}
                                    </Typography>
                                </div>
                                <div className="flex gap-x-[10px]">
                                    <Typography variant="text_12_b" className="text-gray-text">
                                        Номер телефона
                                    </Typography>
                                    <Typography variant="text_14_b">
                                        {contact.phoneNumber}
                                    </Typography>
                                </div>
                                <div className="flex gap-x-[10px]">
                                    <Typography variant="text_12_b" className="text-gray-text">
                                        Почта
                                    </Typography>
                                    <Typography variant="text_14_b">{contact.email}</Typography>
                                </div>
                                <div className="w-full h-[2px] bg-gray-text" />
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </>
    );
};
