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
    postPayment,
    putPayment
} from "@/entities/api/services";
import { SubmitHandler, useForm } from "react-hook-form";

interface IForm {
    file: string;
    amount: number;
}

interface IPaymentHistoryProps {
    currentUserName?: string;
}

export const PaymentHistory = ({ currentUserName }: IPaymentHistoryProps) => {
    const [payments, setPayments] = useState<IPayment[]>([]);

    const user = useSelector((state: RootState) => state.user.user);
    const [trainers, setTrainers] = useState<{ value: string; label: string }[]>([]);
    const [wallet, setWallet] = useState<{ balance: number }>({ balance: 100 });
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

    const fetchPaymentsTrainer = async () => {
        const paymentsGet = currentUserName
            ? await getStudentsPayments(currentUserName)
            : await getTrainerPayments(user.userName);
        setPayments(paymentsGet);
    };

    const handleStatus = async (status: number, payment: IPayment) => {
        await putPayment({ id: payment.paymentId, status: status });
        fetchPaymentsTrainer();
    };

    useEffect(() => {
        if (user.roles.includes("Student")) {
            fetchWallet();
            fetchPayments();
            fetchTrainers();
            return;
        } // Вызов асинхронной функции

        if (user.roles.includes("Trainer")) {
            fetchPaymentsTrainer();
            return;
        }
    }, [user.userName]); // Добавляем зависимость

    const tableHeaderItems = user.roles.includes("Trainer")
        ? ["ФИО", "Группа", "Сумма"]
        : ["ФИО", " ", "Сумма"];

    const paymentHistory: JSX.Element = (
        <div className={styles.table}>
            {payments.length > 0 ? (
                payments.map((payment, index) => (
                    <PaymentRow handleStatus={handleStatus} payment={payment} key={index} />
                ))
            ) : (
                <Typography>Нет платежей</Typography>
            )}
        </div>
    );

    const { register, handleSubmit, formState, reset } = useForm<IForm>();
    const fileError = formState.errors["file"]?.message;
    const numberError = formState.errors["amount"]?.message;

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [currentTrainer, setCurrentTrainer] = useState<string>("");

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        try {
            const status = await postPayment(
                { TrainerId: currentTrainer, File: data.file[0], Amount: data.amount },
                user.userName
            );
            console.log(status);

            // После успешной отправки платежа обновляем данные
            if (status === 200) {
                if (user.roles.includes("Student")) {
                    await fetchPayments();
                    await fetchWallet();
                } else if (user.roles.includes("Trainer")) {
                    await fetchPaymentsTrainer();
                }
                setOpenModal(false); // Закрываем модальное окно
            }
        } catch (error) {
            console.error("Ошибка при добавлении платежа:", error);
        }
        reset({
            file: "",
            amount: undefined
        });
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
                        <Input
                            type="file"
                            {...register("file", { required: "Поле обязательно!" })}
                            isError={!!fileError}
                            helperText={fileError}
                        />
                    </div>
                    <Select
                        label="Выберите тренера"
                        options={trainers}
                        value={currentTrainer}
                        onChange={setCurrentTrainer}
                    />
                    <Input
                        type="number"
                        {...register("amount", {
                            min: {
                                value: 0,
                                message: "Сумма должна быть больше 0"
                            }
                        })}
                        label="Введите сумму с чека"
                        isError={!!numberError}
                        helperText={numberError}
                    />
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        Отправить на проверку
                    </Button>
                </form>
            </Modal>
        </>
    );
};
