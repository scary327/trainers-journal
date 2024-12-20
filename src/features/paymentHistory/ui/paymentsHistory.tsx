import { IPayment } from "@/features/paymentHistory/ui/paymentRow/model/payment.types";
import { useEffect, useState } from "react";

import * as styles from "./paymentsHistory.module.css";
import { PaymentRow } from "./paymentRow/ui/paymentRow";
import { Button, Input, Modal, Select, Typography } from "@/shared/ui";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
    getStudentsPayments,
    getTrainerPayments,
    getTrainers,
    getWallet,
    postPayment
} from "@/entities/api/services";
import { SubmitHandler, useForm } from "react-hook-form";

interface IForm {
    file: string;
    amount: number;
}

export const PaymentHistory = () => {
    const [payments, setPayments] = useState<IPayment[]>([]);

    const user = useSelector((state: RootState) => state.user.user);
    const [trainers, setTrainers] = useState<{ value: string; label: string }[]>([]);
    const [wallet, setWallet] = useState<{ balance: number }>({ balance: 100 });
    useEffect(() => {
        if (user.roles.includes("Student")) {
            const fetchTrainers = async () => {
                const trainersGet = await getTrainers(user.userName);
                setTrainers(
                    trainersGet.map((item) => ({
                        value: item.trainerId,
                        label: `${item.lastName} ${item.firstName} ${item.middleName}`
                    }))
                );
            };
            const fetchPayments = async () => {
                const paymentsGet = await getStudentsPayments(user.userName);
                setPayments(paymentsGet);
            };

            const fetchWallet = async () => {
                const walletGet = await getWallet(user.userName);
                setWallet(walletGet);
            };
            fetchWallet();
            fetchPayments();
            fetchTrainers();
            return;
        } // Вызов асинхронной функции

        if (user.roles.includes("Trainer")) {
            const fetchPaymentsTrainer = async () => {
                const paymentsGet = await getTrainerPayments(user.userName);
                setPayments(paymentsGet);
            };
            fetchPaymentsTrainer();
            return;
        }
    }, [user.userName]); // Добавляем зависимость

    const tableHeaderItems = user.roles.includes("Trainer")
        ? ["ФИО", "Группа", "Сумма"]
        : ["ФИО", " ", "Сумма"];

    const paymentHistory: JSX.Element = (
        <div className={styles.table}>
            {payments.map((payment, index) => (
                <PaymentRow payment={payment} key={index} />
            ))}
        </div>
    );

    const { register, handleSubmit } = useForm<IForm>();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [currentTrainer, setCurrentTrainer] = useState<string>("");

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        const status = postPayment(
            { TrainerId: currentTrainer, File: data.file[0], Amount: data.amount },
            user.userName
        );
        console.log(status);
    };

    return (
        <>
            <div className={styles.container}>
                <Typography variant="text_18_b" className="text-blue-dark mb-[30xp]">
                    История платежей
                </Typography>
                {user.roles.includes("Student") && (
                    <Typography variant="text_14_b" className="absolute right-[60px] top-[20px]">
                        {wallet.balance} рублей
                    </Typography>
                )}
                <div className={styles.table_header}>
                    {tableHeaderItems.map((item, index) => (
                        <span className={styles.header_item} key={index}>
                            {item}
                        </span>
                    ))}
                </div>
                {paymentHistory}
                {user.roles.includes("Student") && (
                    <div className="self-end">
                        <Button variant="primary" onClick={() => setOpenModal(true)}>
                            Добавить платеж
                        </Button>
                    </div>
                )}
            </div>
            <Modal visible={openModal} onClose={() => setOpenModal(false)}>
                <form className="flex flex-col items-start gap-y-[30px]">
                    <Typography variant="text_18_b" className="text-blue-dark mb-[30xp]">
                        Добавить платеж
                    </Typography>
                    <div>
                        <Typography>Загрузите фото чека</Typography>
                        <Input type="file" {...register("file")} />
                    </div>
                    <Select
                        options={trainers}
                        value={currentTrainer}
                        onChange={setCurrentTrainer}
                    />
                    <Input
                        type="number"
                        {...register("amount")}
                        label="Введите сумму с чека"
                        min={0}
                    />
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        Отправить на проверку
                    </Button>
                </form>
            </Modal>
        </>
    );
};
