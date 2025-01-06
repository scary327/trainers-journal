export interface IPayment {
    paymentId: string;
    date: string;
    firstName: string;
    lastName: string;
    middleName: string;
    receiptUrl?: string;
    status: 0 | 1 | 2 | string;
    amount: number;
    groupsNames?: string[];
}

// {
//     "date": "2024-12-20",
//     "firstName": "string",
//     "lastName": "string",
//     "middleName": "string",
//     "amount": 0,
//     "status": 0,
//     "receiptUrl": "string"
//   }

export interface ICreatePayment {
    TrainerId: string;
    Amount: number;
    File: string;
}
