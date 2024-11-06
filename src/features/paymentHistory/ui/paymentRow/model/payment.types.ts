export interface IPayment {
    id: string;
    userId: string;
    fullName: string;
    group: string;
    checkPhoto?: string;
    status: "принят" | "отменен" | "на рассмотрении";
    amount: number;
}
