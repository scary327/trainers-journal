import { Button, Modal } from "@/shared/ui";
import { IPayment } from "../model/payment.types";
import * as styles from "./paymentRow.module.css";
import { useEffect, useState } from "react";
import AcceptSVG from "@/shared/icons/accept.svg";
import CancelSVG from "@/shared/icons/cancel.svg";

interface IPaymentRowProps {
    payment: IPayment;
}

export const PaymentRow = ({ payment }: IPaymentRowProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1200px)");

        const handleMediaChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };
        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleMediaChange);

        return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }, []);

    return (
        <>
            <div className={styles.container}>
                <span>{payment.fullName}</span>
                <span>{payment.group}</span>
                <span>{payment.amount} ₽</span>
                <Button variant="empty" className="p-0" onClick={() => setOpenModal(true)}>
                    Показать чек
                </Button>
                <div className="flex gap-x-3 justify-center">
                    {isMobile ? (
                        <>
                            <button>
                                <AcceptSVG className="text-blue-medium w-[20px] h-[20px]" />
                            </button>
                            <button>
                                <CancelSVG className="text-gray-text w-[20px] h-[20px]" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Button variant="cancel">отменить</Button>
                            <Button variant="primary-small">принять</Button>
                        </>
                    )}
                </div>
            </div>
            <Modal visible={openModal} onClose={() => setOpenModal(false)}>
                {payment.checkPhoto ? (
                    <img src={payment.checkPhoto} alt="фото чека" className="px-5 py-3" />
                ) : (
                    <p className="px-5 py-3">Нет фото чека</p>
                )}
            </Modal>
        </>
    );
};
