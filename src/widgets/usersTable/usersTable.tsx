import * as styles from "./usersTable.module.css";
import { Button, Loader, Modal, Search, SlideOutMenu, Typography } from "@/shared/ui";

import FilterSVG from "@/shared/icons/filter.svg";
import { useState } from "react";
import { Dropdown, DropdownContent, DropdownHeader, PaymentHistory } from "@/features";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
    deleteStudentContacts,
    getStudentContacts,
    getStudents,
    IGetContacts,
    searchStudents
} from "@/entities/api/services";
import { SecondContent } from "@/pages/userPage/ui/secondContent/secondContent";

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
    userName?: string;
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
    groups?: IStudentGroup[];
}

export interface IStudentGroup {
    groupId: string;
    groupName: string;
}

interface IProps {
    openFilter?: () => void;
    openEdit?: (student: IStudent | null) => void;
}

export const UsersTable = ({ openFilter, openEdit }: IProps) => {
    const tableItems: string[] = ["ФИО", "Группа", "Баланс", "КЮ", ""];

    const students: IStudent[] = useSelector((state: RootState) => state.students.students);

    const [payment, setPayment] = useState<IStudent | null>(null);

    const [contacts, setContacts] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const userName = useSelector((state: RootState) => state.user.user.userName);

    const [slideOutOpen, setSlideOutOpen] = useState<boolean>(false);
    const [slideOutContent, setSlideOutContent] = useState<JSX.Element>(<></>);

    const studentContacts: IGetContacts[] = useSelector(
        (state: RootState) => state.students.currentStudentContacts
    );

    const [currentStudent, setCurrentStudent] = useState<IStudent | null>(null);

    const loading = useSelector((state: RootState) => state.students.isLoading);
    const loadingGroups = useSelector((state: RootState) => state.groups.isLoading);

    const tableBody = students.map((student, index) => (
        <Dropdown
            key={index}
            header={
                <DropdownHeader
                    onPayment={() => {
                        setPayment(student);
                    }}
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
    ));

    const setSearch = (inputValue: string) => {
        if (!inputValue) {
            dispatch(getStudents(userName));
            return;
        }
        dispatch(searchStudents({ userName: userName, patternFullName: inputValue }));
        //searchStudents();
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.filter_container}>
                    <Search setSearch={setSearch} />
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
                {loading || loadingGroups ? (
                    <div className="w-full flex justify-center">
                        <Loader />
                    </div>
                ) : (
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
                )}
            </div>
            <Modal visible={!!payment} onClose={() => setPayment(null)}>
                <PaymentHistory currentUserName={payment?.studentInfoItemDto.userName} />
            </Modal>
            <Modal visible={contacts} onClose={() => setContacts(false)}>
                <SlideOutMenu
                    isOpen={slideOutOpen}
                    onClose={() => {
                        setSlideOutContent(<></>);
                        setSlideOutOpen(false);
                    }}
                >
                    {slideOutContent}
                </SlideOutMenu>
                {currentStudent && (
                    <div className="flex flex-col gap-y-[20px]">
                        <Typography variant="text_18_b" className="text-blue-dark mr-6">
                            Контакты ученика {currentStudent.studentInfoItemDto.lastName}{" "}
                            {currentStudent.studentInfoItemDto.firstName}
                        </Typography>
                        {studentContacts.length === 0 ? (
                            <Typography variant="text_16_b" className="text-gray-text">
                                Нет контактов
                            </Typography>
                        ) : (
                            studentContacts.map((contact) => (
                                <div
                                    key={contact.contactItem.email}
                                    className="flex flex-col items-start gap-y-[10px]"
                                >
                                    <div className="flex w-full gap-x-[10px] justify-between items-center">
                                        <Typography variant="text_16_b" className="text-gray-text">
                                            {contact.contactItem.relation}
                                        </Typography>
                                        <div>
                                            {" "}
                                            <Button
                                                variant="empty"
                                                type="button"
                                                onClick={() => {
                                                    setSlideOutOpen(true);
                                                    setSlideOutContent(
                                                        <SecondContent
                                                            form={currentStudent}
                                                            isEdit={true}
                                                            editContact={contact}
                                                            isRegiseter={false}
                                                        />
                                                    );
                                                }}
                                            >
                                                Изменить
                                            </Button>
                                            <Button
                                                variant="cancel"
                                                type="button"
                                                onClick={() =>
                                                    dispatch(deleteStudentContacts(contact)).then(
                                                        () =>
                                                            dispatch(
                                                                getStudentContacts(
                                                                    currentStudent
                                                                        .studentInfoItemDto
                                                                        .userName!
                                                                )
                                                            )
                                                    )
                                                }
                                            >
                                                Удалить
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-[10px]">
                                        <Typography variant="text_14_b">
                                            {contact.contactItem.lastName}
                                        </Typography>
                                        <Typography variant="text_14_b">
                                            {contact.contactItem.firstName}
                                        </Typography>
                                        <Typography variant="text_14_b">
                                            {contact.contactItem.middleName}
                                        </Typography>
                                    </div>
                                    <div className="flex gap-x-[10px]">
                                        <Typography variant="text_12_b" className="text-gray-text">
                                            Номер телефона
                                        </Typography>
                                        <Typography variant="text_14_b">
                                            {contact.contactItem.phoneNumber}
                                        </Typography>
                                    </div>
                                    <div className="flex gap-x-[10px]">
                                        <Typography variant="text_12_b" className="text-gray-text">
                                            Почта
                                        </Typography>
                                        <Typography variant="text_14_b">
                                            {contact.contactItem.email}
                                        </Typography>
                                    </div>
                                    <div className="w-full h-[2px] bg-gray-text" />
                                </div>
                            ))
                        )}
                        <Button
                            variant="primary"
                            type="button"
                            onClick={() => {
                                setSlideOutOpen(true);
                                setSlideOutContent(
                                    <SecondContent
                                        form={currentStudent}
                                        isEdit={false}
                                        isRegiseter={false}
                                    />
                                );
                            }}
                        >
                            Добавить Контакты
                        </Button>
                    </div>
                )}
            </Modal>
        </>
    );
};
