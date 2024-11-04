export interface IPayment {
    id: string;
    userId: string; //получить фио и группу по id
    fullName: string;
    group: string;
    checkPhoto?: string;
    status: "принят" | "отменен" | "на рассмотрении";
    amount: number;
}
