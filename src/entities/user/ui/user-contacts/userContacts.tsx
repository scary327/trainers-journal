import { AppDispatch, RootState } from "@/app/store";
import * as styles from "./userContacts.module.css";
import { Button, Modal, SlideOutMenu, Typography } from "@/shared/ui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStudent, IStudentInfo } from "@/widgets";
import { deleteStudentContacts, getStudentContacts, IGetContacts } from "@/entities/api/services";
import { IUser } from "../../model/user.types";
import { SecondContent } from "@/pages/userPage/ui/secondContent/secondContent";

export const UserContacts = () => {
    const studentContacts: IGetContacts[] = useSelector(
        (state: RootState) => state.students.currentStudentContacts
    );

    const user: IUser = useSelector((state: RootState) => state.user.user);
    const [slideOutOpen, setSlideOutOpen] = useState<boolean>(false);
    const [slideOutContent, setSlideOutContent] = useState<JSX.Element>(<></>);
    const dispatch = useDispatch<AppDispatch>();

    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <>
            <div className={styles.container}>
                <Typography variant="text_18_b" className="text-blue-dark">
                    Контакты
                </Typography>
                <Button
                    variant="empty"
                    onClick={() => {
                        dispatch(getStudentContacts(user.userName));
                        setOpenModal(true);
                    }}
                >
                    Посмотреть контакты
                </Button>
            </div>
            <Modal visible={openModal} onClose={() => setOpenModal(false)}>
                <SlideOutMenu
                    isOpen={slideOutOpen}
                    onClose={() => {
                        setSlideOutContent(<></>);
                        setSlideOutOpen(false);
                    }}
                >
                    {slideOutContent}
                </SlideOutMenu>
                <div className="flex flex-col gap-y-[20px] items-start">
                    <Typography variant="text_24_b">Контакты</Typography>
                    <div className={styles.modal_container}>
                        {studentContacts.map((item, index) => (
                            <div key={index} className={styles.modal_item}>
                                <div className="flex flex-col w-full ">
                                    <div className="flex gap-x-[10px] justify-between items-center">
                                        <Typography variant="text_16_m" className="text-blue-dark">
                                            {item.contactItem.relation}
                                        </Typography>
                                        <div>
                                            <Button
                                                variant="empty"
                                                type="button"
                                                onClick={() => {
                                                    setSlideOutOpen(true);
                                                    setSlideOutContent(
                                                        <SecondContent
                                                            form={
                                                                {
                                                                    groupId: "defoultValue",
                                                                    studentInfoItemDto: {
                                                                        userName: user.userName,
                                                                        ...(user.info as IStudentInfo)
                                                                    }
                                                                } as IStudent
                                                            }
                                                            isEdit={true}
                                                            editContact={item}
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
                                                    dispatch(deleteStudentContacts(item)).then(() =>
                                                        dispatch(getStudentContacts(user.userName))
                                                    )
                                                }
                                            >
                                                Удалить
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="flex flex-col align-items: left gap-y-[5px]">
                                            <div className="flex gap-x-[4px]">
                                                <Typography
                                                    variant="text_14_m"
                                                    className="text-gray-text"
                                                >
                                                    Фамилия:
                                                </Typography>
                                                <Typography variant="text_16_m">
                                                    {item.contactItem.lastName}
                                                </Typography>
                                            </div>
                                            <div className="flex gap-x-[4px]">
                                                <Typography
                                                    variant="text_14_m"
                                                    className="text-gray-text"
                                                >
                                                    Имя:
                                                </Typography>
                                                <Typography variant="text_16_m">
                                                    {item.contactItem.firstName}
                                                </Typography>
                                            </div>
                                            <div className="flex gap-x-[4px]">
                                                <Typography
                                                    variant="text_14_m"
                                                    className="text-gray-text"
                                                >
                                                    Отчество:
                                                </Typography>
                                                <Typography variant="text_16_m">
                                                    {item.contactItem.middleName}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="flex flex-col align-items: left gap-y-[5px]">
                                            <div className="flex gap-x-[4px]">
                                                <Typography
                                                    variant="text_14_m"
                                                    className="text-gray-text"
                                                >
                                                    Почта:
                                                </Typography>
                                                <Typography variant="text_16_m">
                                                    {item.contactItem.email}
                                                </Typography>
                                            </div>
                                            <div className="flex gap-x-[4px]">
                                                <Typography
                                                    variant="text_14_m"
                                                    className="text-gray-text"
                                                >
                                                    Телефон:
                                                </Typography>
                                                <Typography variant="text_16_m">
                                                    {item.contactItem.phoneNumber}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button
                            variant="primary"
                            type="button"
                            onClick={() => {
                                setSlideOutOpen(true);
                                setSlideOutContent(
                                    <SecondContent isEdit={false} isRegiseter={false} />
                                );
                            }}
                        >
                            Добавить Контакты
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
