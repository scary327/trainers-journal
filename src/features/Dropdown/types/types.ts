export interface IStudentHeader {
    fullName: string;
    group: string;
    balance: string;
    kyu: number;
}

export interface IStudentDetails {
    gender?: string;
    birthDate?: string;
    school?: string;
    //дата поступления
    address?: string;
    mother?: string;
    father?: string;
}
