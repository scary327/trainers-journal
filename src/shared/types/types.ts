export interface DateRange {
    start: Date | null;
    end: Date | null;
}

export interface IFilterItem {
    id: string;
    title: string;
}

export interface IClassTime {
    start: string;
}

export interface IStudentClass {
    fullName: string;
    kyu: number;
    status: boolean;
}

export interface IClass {
    practiceId: string;
    groupName: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    trainerFirstName: string;
    trainerLastName: string;
    trainerMiddleName: string;
}

export interface IStudentHeader {
    firstName: string;
    lastName: string;
    middleName: string;
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
