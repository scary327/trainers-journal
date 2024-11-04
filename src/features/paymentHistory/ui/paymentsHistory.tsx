import { RootState } from "@/app/store";
import { setLoading, setPayments } from "@/entities/payment/model/payment.reducer";
import { IPayment } from "@/entities/payment/model/payment.types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as styles from "./paymentsHistory.module.css";
import { PaymentRow } from "@/entities/payment/ui/paymentRow";

export const PaymentHistory = () => {
    const payments = useSelector((state: RootState) => state.payment.payments);
    const loading = useSelector((state: RootState) => state.payment.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPayments = async () => {
            dispatch(setLoading(true));

            const fetchedPayments: IPayment[] = [
                {
                    id: "1",
                    userId: "1",
                    fullName: "Пепегин Пепега Клоунич",
                    group: "Клоунская",
                    amount: 300,
                    checkPhoto: "",
                    status: "на рассмотрении"
                },
                {
                    id: "2",
                    userId: "2",
                    fullName: "Иванов Иван Иванович",
                    group: "Разработка",
                    amount: 500,
                    checkPhoto: "",
                    status: "принят"
                },
                {
                    id: "3",
                    userId: "3",
                    fullName: "Смирнова Анна Петровна",
                    group: "Маркетинг",
                    amount: 450,
                    checkPhoto: "",
                    status: "отменен"
                },
                {
                    id: "4",
                    userId: "4",
                    fullName: "Кузнецов Сергей Александрович",
                    group: "Аналитика",
                    amount: 350,
                    checkPhoto: "",
                    status: "на рассмотрении"
                },
                {
                    id: "5",
                    userId: "5",
                    fullName: "Васильева Ольга Дмитриевна",
                    group: "Управление",
                    amount: 600,
                    checkPhoto: "",
                    status: "принят"
                }
            ];

            setTimeout(() => {
                dispatch(setPayments(fetchedPayments));
                dispatch(setLoading(false));
            }, 1000);
        };

        fetchPayments();
    }, [dispatch]);

    const tableHeaderItems = ["ФИО", "Группа", "Сумма"];

    const paymentHistory: JSX.Element = loading ? (
        <div className="skeleton w-full h-[225px] rounded-[20px]" />
    ) : (
        <div className={styles.table}>
            {payments.map((payment) => (
                <PaymentRow payment={payment} key={payment.id} />
            ))}
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.title}>История платежей</div>
            <div className={styles.table_header}>
                {tableHeaderItems.map((item, index) => (
                    <span className={styles.header_item} key={index}>
                        {item}
                    </span>
                ))}
            </div>
            {paymentHistory}
        </div>
    );
};
