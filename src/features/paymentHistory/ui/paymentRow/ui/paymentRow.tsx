import { Button, Modal, Typography } from "@/shared/ui";
import { IPayment } from "../model/payment.types";
import * as styles from "./paymentRow.module.css";
import { useState } from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { putPayment } from "@/entities/api/services";

interface IPaymentRowProps {
    payment: IPayment;
}

export const PaymentRow = ({ payment }: IPaymentRowProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const user = useSelector((state: RootState) => state.user.user);

    switch (payment.status) {
        case 2:
            payment.status = "На рассмотрении";
            break;
        case 1:
            payment.status = "Отклонен";
            break;
        case 0:
            payment.status = "Одобрен";
            break;
    }

    //0 или 1
    const handleStatus = (status: number) => {
        putPayment({ id: payment.paymentId, status: status });
    };

    return (
        <>
            <div className={styles.container}>
                <span>
                    {payment.lastName} {payment.firstName} {payment.middleName}
                </span>
                {user.roles.includes("Trainer") ? (
                    <span>{payment.groupsNames?.join(", ") || ""}</span>
                ) : (
                    <span />
                )}
                <span>{payment.amount} ₽</span>
                <Button variant="empty" className="p-0" onClick={() => setOpenModal(true)}>
                    Показать чек
                </Button>
                <div className="flex gap-x-3 justify-center">
                    {user.roles.includes("Trainer") &&
                        (payment.status === "На рассмотрении" ? (
                            <>
                                <Button variant="cancel" onClick={() => handleStatus(1)}>
                                    отменить
                                </Button>
                                <Button variant="primary-small" onClick={() => handleStatus(0)}>
                                    принять
                                </Button>
                            </>
                        ) : (
                            <Typography variant="text_14_b">{payment.status}</Typography>
                        ))}
                    {user.roles.includes("Student") && (
                        <Typography variant="text_14_b">{payment.status}</Typography>
                    )}
                </div>
            </div>
            <Modal visible={openModal} onClose={() => setOpenModal(false)}>
                {payment.receiptUrl ? (
                    <img
                        src={payment.receiptUrl}
                        alt="фото чека"
                        className="px-5 py-3 max-h-[80vh]"
                    />
                ) : (
                    <p className="px-5 py-3">Нет фото чека</p>
                )}
            </Modal>
        </>
    );
};
