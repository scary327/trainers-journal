// import { RootState } from "@/app/store";
// import { useSelector } from "react-redux";
import * as styles from "./userContacts.module.css";
import { Button, Modal, Typography } from "@/shared/ui";
import { useState } from "react";

export const UserContacts = () => {
    // const user = useSelector((state: RootState) => state.user)

    const contacts = [
        //если нет пустое отправлять
        {
            firstName: "Кирилл",
            lastName: "Андропов",
            middleName: "Олегович",
            phoneNumber: "7 800 900-49-99",
            email: "email@example.com",
            relation: "Папа"
        },
        {
            firstName: "Александра",
            lastName: "Андропова",
            middleName: "Олеговна",
            phoneNumber: "7 800 900-49-98",
            email: "email@example.com",
            relation: "Мама"
        }
    ];

    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <>
            <div className={styles.container}>
                <Typography variant="text_18_b" className="text-blue-dark">
                    Контакты
                </Typography>
                <Button variant="empty" onClick={() => setOpenModal(true)}>
                    Посмотреть контакты
                </Button>
                <Button variant="empty" onClick={() => setOpenModal(true)}>
                    Изменить контакты
                </Button>
            </div>
            <Modal visible={openModal} onClose={() => setOpenModal(false)}>
                <div className="flex flex-col gap-y-[20px] items-start">
                    <Typography variant="text_24_b">Контакты</Typography>
                    <div className={styles.modal_container}>
                        {contacts.map((item, index) => (
                            <div key={index} className={styles.modal_item}>
                                <Typography variant="text_16_m" className="text-blue-dark">
                                    {item.relation}
                                </Typography>
                                <div className={styles.modal_item_info}>
                                    <div className="flex gap-x-[4px]">
                                        <Typography variant="text_14_m" className="text-gray-text">
                                            Фамилия:
                                        </Typography>
                                        <Typography variant="text_16_m">{item.lastName}</Typography>
                                    </div>
                                    <div className="flex gap-x-[4px]">
                                        <Typography variant="text_14_m" className="text-gray-text">
                                            Имя:
                                        </Typography>
                                        <Typography variant="text_16_m">
                                            {item.firstName}
                                        </Typography>
                                    </div>
                                    <div className="flex gap-x-[4px]">
                                        <Typography variant="text_14_m" className="text-gray-text">
                                            Отчество:
                                        </Typography>
                                        <Typography variant="text_16_m">
                                            {item.middleName}
                                        </Typography>
                                    </div>
                                </div>
                                <div className={styles.modal_item_info}>
                                    <div className="flex gap-x-[4px]">
                                        <Typography variant="text_14_m" className="text-gray-text">
                                            Почта:
                                        </Typography>
                                        <Typography variant="text_16_m">{item.email}</Typography>
                                    </div>
                                    <div className="flex gap-x-[4px]">
                                        <Typography variant="text_14_m" className="text-gray-text">
                                            Телефон:
                                        </Typography>
                                        <Typography variant="text_16_m">
                                            {item.phoneNumber}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
};
